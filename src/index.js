const base = require('@high-standards-js/base');

(async() => {
    await base.checkAcceptedHighStandards();

    let packageJsonOfConfig = base.getInitiatingProjectPackageJson();
    
    packageJsonOfConfig = await base.addDevDependency(packageJsonOfConfig, 'lint-staged');
    packageJsonOfConfig = await base.addDevDependency(packageJsonOfConfig, 'prettier');

    packageJsonOfConfig.husky.hooks['pre-commit'] = 'lint-staged';
    
    base.writeFile(
        '.prettierrc',
        base.getTemplate(__dirname, '.highstandards/.prettierrc')
    );
    
    base.writeInitiatingProjectPackageJson(packageJsonOfConfig);
})()
