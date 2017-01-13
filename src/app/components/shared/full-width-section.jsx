'use strict';

import React from 'react';
import ClearFix from 'material-ui/internal/ClearFix';
import Spacing from 'material-ui/styles/spacing';
import withWidth, {SMALL, LARGE} from 'material-ui/utils/withWidth';

// TODO: check why {desktopGutter} from spacing does not work
const desktopGutter = Spacing.desktopGutter;

const FullWidthSection = React.createClass({

	propTypes: {
		children: React.PropTypes.node,
		contentStyle: React.PropTypes.object,
		contentType: React.PropTypes.string,
		style: React.PropTypes.object,
		useContent: React.PropTypes.bool,
		width: React.PropTypes.number.isRequired
	},

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
			width,
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
					width === SMALL && styles.rootWhenSmall,
          width === LARGE && styles.rootWhenLarge)}
				>
				{content}
			</ClearFix>
		);
	}
});

module.exports = withWidth()(FullWidthSection);
