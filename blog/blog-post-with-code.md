---
date: 2019-05-02T01:26:14.876Z
title: Blog Post with Code
author: River Gillis
verb: and-writes
---
here is some code

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        `gatsby-remark-prismjs`,
      ]
    }
  }
]
```

Did that work?

What about this?

```cpp{numberLines: true}
#include <iostream>
int main() 
{
    std::cout << "Hello, World!";
    return 0;
}
```

Hopefully!
