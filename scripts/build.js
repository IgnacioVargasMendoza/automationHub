const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DIST_DIR = path.resolve(__dirname, '../dist');
const SRC_DIR = path.resolve(__dirname, '../src');

function cleanDist() {
    if (fs.existsSync(DIST_DIR)) {
        fs.rmSync(DIST_DIR, { recursive: true, force: true });
    }
}

function runTsc() {
    console.log('Compiling TypeScript...');
    try {
        execSync('npx tsc', { stdio: 'inherit', cwd: path.resolve(__dirname, '..') });
    } catch (e) {
        console.error('TypeScript compilation failed.');
        process.exit(1);
    }
}

function processFiles(dir) {
    if (!fs.existsSync(dir)) return;

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            processFiles(fullPath);
        } else if (entry.isFile()) {
            if (entry.name.endsWith('.js')) {
                const newPath = fullPath.replace(/\.js$/, '.gs');
                fs.renameSync(fullPath, newPath);
                validateFile(newPath);
            } else if (entry.name.endsWith('.html')) {
                // keep html
            } else if (entry.name.endsWith('.map')) {
                fs.unlinkSync(fullPath); // remove source maps if any
            }
        }
    }
}

function validateFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    // Simple check for CommonJS or ES Module syntax that shouldn't be there
    // Note: Comments might trigger false positives if we are not careful, but strict is good.
    const badPatterns = [
        /^\s*import\s+/m,
        /^\s*export\s+/m,
        /require\(/
    ];

    for (const pattern of badPatterns) {
        if (pattern.test(content)) {
            // Allow "export var" or "export function" inside namespaces? 
            // TS emits "export var" inside namespaces in the IIFE. 
            // Actually, Apps Script doesn't like "export" keyword at top level. 
            // Inside a namespace function wrapper, it's fine if it's not top-level ES module export.
            // But we must be careful. TS namespace emit: `(function (Foo) { ... })(Foo || (Foo = {}));`
            // It uses `export` inside that? No, it assigns to the object.
            // However, if we compile with `module: None`, top-level `export` isn't generated.
            console.error(`ERROR: Forbidden module syntax found in ${filePath}: ${pattern}`);
            console.error('Apps Script runtimes do not support CommonJS/ES Modules.');
            process.exit(1);
        }
    }
}

function copyStatic() {
    const appsscript = path.resolve(__dirname, '../appsscript.json');
    if (fs.existsSync(appsscript)) {
        fs.copyFileSync(appsscript, path.join(DIST_DIR, 'appsscript.json'));
    }
}

function validateStructure() {
    if (fs.existsSync(path.join(DIST_DIR, 'Code.gs')) || fs.existsSync(path.join(DIST_DIR, 'index.gs'))) {
        console.error('ERROR: Prohibited single-file bundle (Code.gs or index.gs) found in dist!');
        process.exit(1);
    }

    const subdirs = fs.readdirSync(DIST_DIR, { withFileTypes: true }).filter(d => d.isDirectory());
    if (subdirs.length === 0) {
        console.warn('WARNING: No subdirectories found in dist. Ensure features/platform structure is preserved.');
    }

    // Recursive count
    let fileCount = 0;
    function count(d) {
        const list = fs.readdirSync(d, { withFileTypes: true });
        for (const item of list) {
            if (item.isDirectory()) count(path.join(d, item.name));
            else if (item.name.endsWith('.gs')) fileCount++;
        }
    }
    count(DIST_DIR);
    console.log(`Build Success. Emitted ${fileCount} .gs files.`);
    console.log('Top-level dist folders:', subdirs.map(d => d.name).join(', '));
}

function main() {
    console.log('Starting Build...');
    cleanDist();
    runTsc();
    copyStatic();
    processFiles(DIST_DIR);
    validateStructure();
}

main();
