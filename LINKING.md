# Linking Local Packages for Standalone React Native App

## Step 1: Build the packages in the monorepo

```bash
cd /Users/sagnikghosh/Desktop/tambo

# Build react-sdk first (react-native-sdk depends on it)
npm run build -w react-sdk

# Build react-native-sdk
npm run build -w react-native-sdk
```

## Step 2: Link the packages

In the monorepo:

```bash
cd /Users/sagnikghosh/Desktop/tambo/react-sdk
npm link

cd /Users/sagnikghosh/Desktop/tambo/react-native-sdk
npm link
```

## Step 3: Link in your standalone React Native app

```bash
cd /path/to/your/standalone/showcase-react-native

# Link both packages
npm link @tambo-ai/react
npm link @tambo-ai/react-native
```

## Step 4: Install dependencies

```bash
npm install
```

## Option 2: Using `file:` protocol (alternative)

In your standalone app's `package.json`:

```json
{
  "dependencies": {
    "@tambo-ai/react": "file:../../tambo/react-sdk",
    "@tambo-ai/react-native": "file:../../tambo/react-native-sdk"
  }
}
```

Then run `npm install`. Note: You'll need to rebuild the packages whenever you make changes.

## Rebuilding after changes

Whenever you make changes to the packages:

```bash
# In the monorepo
npm run build -w react-sdk
npm run build -w react-native-sdk

# In your standalone app, if using file: protocol
npm install
```

## Troubleshooting

- **Metro cache issues**: Run `npx expo start --clear`
- **Module not found**: Make sure packages are built (`dist/` and `esm/` folders exist)
- **Multiple React instances**: The standalone app should have its own React, so this shouldn't be an issue
