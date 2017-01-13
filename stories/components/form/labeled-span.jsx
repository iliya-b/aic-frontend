import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import {TextField} from 'material-ui';
import LabeledSpan from 'app/components/form/labeled-span';

storiesOf('Form', module)
	.addDecorator(themeDecorator)
	.add('LabeledSpan', () => (
		<div>
			<h2>side by side</h2>
			<TextField floatingLabelFixed floatingLabelText="TextField for comparison" defaultValue="TextField for comparison"/>
			<LabeledSpan/>
			<LabeledSpan off/>
			<LabeledSpan label="no value"/>
			<LabeledSpan label="empty value" value=""/>
			<LabeledSpan label="with value" value="value"/>
			<LabeledSpan off label="no value"/>
			<LabeledSpan off label="empty value" value=""/>
			<LabeledSpan off label="with value" value="value"/>

			<h2>br</h2>
			<TextField floatingLabelFixed floatingLabelText="TextField for comparison" defaultValue="TextField for comparison"/><br/>
			<LabeledSpan/><br/>
			<LabeledSpan off/><br/>
			<LabeledSpan label="no value"/><br/>
			<LabeledSpan label="empty value" value=""/><br/>
			<LabeledSpan label="with value" value="value"/><br/>
			<LabeledSpan off label="no value off"/><br/>
			<LabeledSpan off label="empty value off"/><br/>
			<LabeledSpan off label="with value off" value="value"/><br/>
		</div>
	));
