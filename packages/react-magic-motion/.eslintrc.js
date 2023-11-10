module.exports = {
  extends: ["custom/react-internal"],
  rules: {
    "@next/next/no-img-element": "off",
    "react/jsx-no-leaked-render": "off",
    "react/jsx-sort-props": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
  },
  overrides:[
    {
      files: ["*.test.tsx"],
      "rules": {
        "@typescript-eslint/no-unsafe-assignment" : 'off',
        "@typescript-eslint/no-unsafe-call": "off",
        'import/no-extraneous-dependencies': [
          1,
          {
            devDependencies: true,
            includeInternal: false,
            includeTypes: false,
            packageDir: ['.', '../..'], // <--- the key addition
          },
        ],
      }
    }
  ]
};
