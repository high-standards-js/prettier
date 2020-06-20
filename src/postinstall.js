const base = require('@high-standards-js/base');

(async() => {
    await base.checkAcceptedHighStandards();

    let packageJsonOfConfig = base.getInitiatingProjectPackageJson();
    
    packageJsonOfConfig = await base.addDevDependency(packageJsonOfConfig, 'lint-staged');
    packageJsonOfConfig = await base.addDevDependency(packageJsonOfConfig, 'prettier');

    packageJsonOfConfig.husky.hooks['pre-commit'] = 'lint-staged';
    if (!packageJsonOfConfig['lint-staged']) {
        packageJsonOfConfig['lint-staged'] = {
            '*.{ts,js,json,css,yaml}': [
                'prettier --write',
                'git add'
            ]
        }
    }
    base.writeFile(
        '.prettierrc',
        base.getTemplate(__dirname, '.prettierrc')
    );
    base.writeInitiatingProjectPackageJson(packageJsonOfConfig);
})()
