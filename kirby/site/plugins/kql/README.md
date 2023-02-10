# Kirby QL

This is a customized version of KQL that supports 'models' -> different selects based on type/class of an object:

## Example:

```js
const { result } = await fetchKql({
  query: 'page("home")',
  select: {
    title: true,
    blocks: {
      query: 'page.blocks.toBlocks',
      // needs select as potential fallback, empty array will return null if no matches
      // if not specified, query will not respect 'models' and return all fields
      select: ['type'],
      // 'models' as directory for different 'selects' based on class/block type
      models: {
        // 'select' for 'image' block type
        image: {
          type: true,
          image: 'block.image.toFile?.resize(200)',
          title: true
        },
        // 'select' for 'text' block type
        text: ['type', 'heading', 'text']
      }
    }
  }
})
```

## Works with

- Page objects (`intendedTemplate`, similar to Page models)
- User objects (`role`, similar to User models)
- Block objects (`type`, similar to Block models)
- File objects (Based on `template`)

## Original License

[MIT](./LICENSE) License © 2020-2022 [Bastian Allgeier](https://getkirby.com)
