# Plan-again

Alright what now.

So what happens currently if I try to *add* an item which I know is fubar? Let's see...

Okay, you get an error in the console. Meh. Now we gotta start thinking about some interface stuff and how it handles these events.

Remember, *implement it ugly* and then make it pretty. The logic is far more important.

## These APIs you're building

Like `insertJDItem`. They all need some way to return a response and an error to the caller. That way should be standard, obviously.

Seems simple enough. Each call returns:

```js
{
  success: true | false // This way you can test for `success` nice and easy.
  error: 'If success === false, there should be an error.'
}
```