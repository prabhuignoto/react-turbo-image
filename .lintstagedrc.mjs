export default {
  '*.js': ['eslint --fix', 'git add'],
  '*.ts': ['eslint --fix', 'git add'],
  '*.tsx': ['eslint --fix', 'git add'],
  '*.{css,scss}': ['stylelint --fix', 'git add'],
  '*.{json,md,yml}': ['prettier --write', 'git add'],
};