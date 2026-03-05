module.exports = {
  name: 'plugin-duplicates-list',
  factory: (require) => {
    const { BaseCommand } = require('@yarnpkg/cli');
    const { Configuration, Project, structUtils } = require('@yarnpkg/core');

    class DuplicatesListCommand extends BaseCommand {
      static paths = [
        ['duplicates'],
      ];

      async execute() {
        // cwd - current working directory 😉
        const cwd = await Configuration.findProjectCwd(this.context.cwd);
        // or just this.context.cwd
        // const cwd = this.context.cwd;

        const configuration = await Configuration.find(cwd, this.context.plugins);

        const { project} = await Project.find(configuration, cwd);

        await project.restoreInstallState();

        const packages = project.storedPackages
            .values()
            .reduce((acc, pkg) => {
              if (structUtils.isVirtualLocator(pkg)) {
                return acc;
              }

              const name = structUtils.stringifyIdent(pkg);
              const version = pkg.version;

              if (!acc[name]) {
                acc[name] = [];
              }

              if (!acc[name].includes(version)) {
                acc[name].push(version);
              }

              return acc;
            }, {});

        const duplicates = Object.entries(packages).filter(([, versions]) => versions.length > 1);

        duplicates.forEach(([name, versions], index) => {
          this.context.stdout.write(`${index++}. ${name} [${versions.join(', ')}]\n`);
        });
      }
    }

    return {
      commands: [DuplicatesListCommand],
    }
  },
};
