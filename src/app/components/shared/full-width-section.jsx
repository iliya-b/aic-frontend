'use strict';

import React from 'react';
import ClearFix from 'material-ui/lib/clearfix';
// const {StyleResizable, StylePropable} = mui.Mixins;
import {desktopGutter} from 'material-ui/lib/styles/spacing';
import {StyleResizable} from 'material-ui/lib/mixins';

const FullWidthSection = React.createClass({

	// mixins: [StylePropable, StyleResizable],

	propTypes: {
		children: React.PropTypes.node,
		contentStyle: React.PropTypes.object,
		contentType: React.PropTypes.string,
		style: React.PropTypes.object,
		useContent: React.PropTypes.bool
	},

	mixins: [
		StyleResizable
	],

	getDefaultProps() {
		return {
			useContent: false,
			contentType: 'div'
		};
	},

	render() {
		const {
			style,
			useContent,
			contentType,
			contentStyle,
			...other
		} = this.props;

		const styles = {
			root: {
				padding: `${desktopGutter}px`,
				boxSizing: 'border-box'
			},
			content: {
				maxWidth: '1200px',
				margin: '0 auto'
			},
			rootWhenSmall: {
				paddingTop: `${(desktopGutter * 2)}px`,
				paddingBottom: `${(desktopGutter * 2)}px`
			},
			rootWhenLarge: {
				paddingTop: `${(desktopGutter * 3)}px`,
				paddingBottom: `${(desktopGutter * 3)}px`
			}
		};

		let content;
		if (useContent) {
			content =
				React.createElement(
					contentType,
					{style: Object.assign(styles.content, contentStyle)},
					this.props.children
				);
		} else {
			content = this.props.children;
		}

		return (
			<ClearFix
				{...other}
				style={Object.assign(
					styles.root,
					style,
					this.isDeviceSize(StyleResizable.statics.Sizes.SMALL) && styles.rootWhenSmall,
					this.isDeviceSize(StyleResizable.statics.Sizes.LARGE) && styles.rootWhenLarge)}
				>
				{content}
			</ClearFix>
		);
	}
});

module.exports = FullWidthSection;
