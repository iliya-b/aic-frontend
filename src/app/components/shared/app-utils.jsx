
var AppUtils = {

  text: {
    fieldIsRequired: 'This field is required',
  },

  fieldIsRequired: function (field) {
    var isInvalid = AppUtils.isEmpty(field.getValue());
    return isInvalid ? AppUtils.text.fieldIsRequired : '' ;
  },

  isEmpty: function (textField) {
    return ( $.trim(textField) === '' );
  }


};







module.exports = AppUtils;