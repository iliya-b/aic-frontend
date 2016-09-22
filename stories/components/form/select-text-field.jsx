import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import SelectTextField from 'app/components/form/select-text-field';

const selectFieldItems = ['abc', 'def', 'long strange label of longness super extensive', 'Maps', 'Books', 'Flights', 'Apps'];
const selectFieldItems2 = selectFieldItems.map((a, i) => ({value: String(i), label: a}));

storiesOf('Form', module)
	.addDecorator(themeDecorator)
	.add('SelectTextField', () => (
		<div>
			<h2>Items, single select, with hint text</h2>
			<SelectTextField hintText="hintText" items={selectFieldItems}/>
			<h2>Items, multi select, with hint text</h2>
			<SelectTextField hintText="hintText" multiple items={selectFieldItems}/>
			<h2>Items with value, single select</h2>
			<SelectTextField items={selectFieldItems2}/>
			<h2>Items with value, multi select</h2>
			<SelectTextField multiple items={selectFieldItems2}/>
		</div>
	));
