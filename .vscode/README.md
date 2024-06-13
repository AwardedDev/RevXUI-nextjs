## VS Code Shared Settings

# Getting Started

VS Code shared settings and defaults are configured for this repo 


# Shared Settings

| Setting                  | Description                                                       |
| ------------------------ | ----------------------------------------------------------------- |
| eslint.validate          | Validate and fixes eslint errors. This also fixes prettier issues |
| typescript.suggest.paths | Turned off to enable correct usage within auto-rename-tag         |

# Recommended Extensions

| Extension          | Description                             |
| ------------------ | --------------------------------------- |
| code-spell-checker | checks spelling errors withing the code |
| vscode-icons       | Directory icons                         |
| vscode-jest        | Helps renaming tags                     |
| auto-rename-tag    | Helps renaming tags                     |
| vscode-eslint      | Integrate with lint rules               |

### Snippets

```javascript
// entering: desc
describe('', () => {});
```

```javascript
// entering: it
it('should ', () => {
  // arrange
  // act
  // assert
});
```

```javascript
// entering: ita
it('should ', async () => {
  // arrange
  // act
  // assert
});
```

```javascript
// entering: func
export default function () {}
```

```javascript
// entering: hook
export default function use() {}
```
