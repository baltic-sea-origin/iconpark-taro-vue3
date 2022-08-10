import * as iconParkIcons from '@icon-park/svg';
import { renderFile, render } from 'ejs';
import { join } from 'path';
import mkdirp from 'mkdirp';
import { writeFileSync } from 'fs';

const taroCodeGen = async () => {
  const filterNames = ['setConfig', 'DEFAULT_ICON_CONFIGS'];
  const iconNames = Object.keys(iconParkIcons).filter(
    name => !filterNames.includes(name)
  );
  console.log(`开始编译, 共${iconNames.length}个文件`);
  const baseUrl = join(__dirname, `../../taro/dist`);
  const iconsUrl = join(baseUrl, './icons');
  mkdirp.sync(iconsUrl); // create path
  for (let i = 0; i < iconNames.length; i++) {
    const iconName = iconNames[i];
    const renderCode = await renderFile(
      join(__dirname, `./ejs/icon.taro.ejs`),
      {
        icon: {
          name: iconName
        }
      }
    );
    writeFileSync(join(iconsUrl, `${iconName}.vue`), renderCode, {
      encoding: 'utf8'
    });
  }
  const mapCode = render(
    `<% iconNames.forEach(function(iconName){ -%>
export { default as <%= iconName %> } from './icons/<%= iconName %>.vue'
<% }); -%>`,
    {
      iconNames
    }
  );
  writeFileSync(join(baseUrl, `map.ts`), mapCode, {
    encoding: 'utf8'
  });
  writeFileSync(join(baseUrl, `index.ts`), `export * from './map'`, {
    encoding: 'utf8'
  });
};

export default taroCodeGen

