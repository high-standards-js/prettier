const base = require('@high-standards-js/base');
const husky = require('@high-standards-js/husky');

(async () => {
  await base.checkAcceptedHighStandards();

  let packageJson = base.getInitiatingProjectPackageJson();

  packageJson = await base.addDevDependency(packageJson, 'lint-staged');
  packageJson = await base.addDevDependency(packageJson, 'prettier');

  husky.addHookCommand(packageJson, 'pre-commit', 'lint-staged');

  if (!packageJson['lint-staged']) {
    packageJson['lint-staged'] = {
      '*.{ts,js,json,css,yaml}': ['prettier --write', 'git add'],
    };
  }
  base.copyFileFromTemplate(__dirname, '.prettierrc');
  base.writeInitiatingProjectPackageJson(packageJson);
})();
