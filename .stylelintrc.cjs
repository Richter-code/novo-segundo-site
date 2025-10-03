module.exports = {
  extends: ['stylelint-config-recommended'],
  // Use postcss-scss so tailwind directives and modern css are parsed
  customSyntax: 'postcss-scss',
  rules: {
    // Allow Tailwind at-rules and @apply/@layer
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'layer',
          'theme'
        ]
      }
    ]
  }
}
