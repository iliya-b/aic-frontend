import fs from 'fs';
import {buildComponentTests} from './_auto-render';

const componentsToLoad = ['icon', 'toolbar'];

componentsToLoad.forEach(c => {
	const componentsProps = require(`../../prop-samples/${c}`);
	const files = fs.readdirSync(`${__dirname}/../../../src/app/components/${c}/`).map(f => f.substring(0, f.length - 4));
	const components = files.map(f => require(`app/components/${c}/${f}`));
	components.forEach(c => buildComponentTests(c, componentsProps));
});
