module.exports = {
  'parser': 'babel-eslint',
  'extends': [
    'eslint:recommended', 'google',
    'plugin:react/recommended'
  ],
  'rules': {
    'require-jsdoc': 'off',
    'comma-dangle': 'off',
    'arrow-parens': 'off',
    'linebreak-style': 'off',
    'react/prop-types': 'off'
  }
};
