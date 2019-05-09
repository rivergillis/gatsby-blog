---
date: 2019-05-02T01:26:14.876Z
title: Blog Post with Code
cardTitle: Blog Post with Code
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

Long lines...
```typescript
instrs[0xe9] = this.JP_hl.bind(this);
instrs[0xee] = this.XOR_imm.bind(this);

//// CB Prefix instructions

// Instrs 0xcb40 to 0xcb80 are BIT
let current_bit: number = 0;
let current_instr = 0xcb40;
while (current_instr < 0xcb7f) {
  instrs[current_instr++] = this.BIT_reg.bind(this, current_bit, 'b');
  instrs[current_instr++] = this.BIT_reg.bind(this, current_bit, 'c');
  instrs[current_instr++] = this.BIT_reg.bind(this, current_bit, 'd');
  instrs[current_instr++] = this.BIT_reg.bind(this, current_bit, 'e');
  instrs[current_instr++] = this.BIT_reg.bind(this, current_bit, 'h');
  instrs[current_instr++] = this.BIT_reg.bind(this, current_bit, 'l');
  instrs[current_instr++] = this.BIT_mem.bind(this, current_bit);
  instrs[current_instr++] = this.BIT_reg.bind(this, current_bit, 'a');
  current_bit++;

      instrs[current_instr++] = this.BIT_reg.bind(thi11111111111829838392093333
}

return instrs;
};
```