import React from 'react';
import Formsy from 'formsy-react';
import TextField from 'material-ui/TextField';

// Inspiration from formsy-material-ui
// https://github.com/mbrookes/formsy-material-ui/blob/master/src/FormsyText.jsx

const FormsyTextField = React.createClass({

	propTypes: {
		defaultValue: React.PropTypes.any,
		name: React.PropTypes.string.isRequired,
		onBlur: React.PropTypes.func,
		onChange: React.PropTypes.func,
		onFocus: React.PropTypes.func,
		onKeyDown: React.PropTypes.func,
		value: React.PropTypes.any,
		validateOnChange: React.PropTypes.bool,
		requiredError: React.PropTypes.string,
		errorText: React.PropTypes.string,
		disabled: React.PropTypes.bool
	},

	mixins: [Formsy.Mixin],

	handleChangeValue(event) {
		this.setValue(event.currentTarget.value);
		if (this.props.onChange) {
			this.props.onChange(event);
		}
	},

	render() {
		const {
			defaultValue, // eslint-disable-line no-unused-vars
			value, // eslint-disable-line no-unused-vars
			onChange, // eslint-disable-line no-unused-vars
			errorText, // eslint-disable-line no-unused-vars
			disabled, // eslint-disable-line no-unused-vars
			...other
		} = this.props;
		const intendedErrorText = (this.isFormSubmitted() || !this.isPristine()) && this.showRequired() && this.props.requiredError ? this.props.requiredError : this.getErrorMessage();
		const intendedValue = this.getValue() || this.props.defaultValue || '';
		const intendedDisabled = 'disabled' in this.props ? this.props.disabled : this.isFormDisabled();
		return (
			<TextField
				{...other}
				errorText={intendedErrorText}
				onChange={this.handleChangeValue}
				value={intendedValue}
				disabled={intendedDisabled}
				/>
		);
	}
});

export default FormsyTextField;
