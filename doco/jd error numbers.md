# JD errors (JDE)

What are the *classes* of errors that we should be checking for?

## 10-19 Numbers are out of sequence

e.g. Area `10-19` follows `20-29`.

In the current implementation, where our data is a `:UserbaseData` object, this isn't possible. `jdProjectMachineRunner()` sorts our data for us.

That said, `10-19` could still follow `10-19`. In the original implementation (where we expected a text-based input to be parsed), this does throw this error (as `10-19` is not numerically larger than itself). But I'd like this to be a specific *duplicate number* error.

## 20-29 Items do not belong to their parent

e.g. Category `20` follows `10-19`.

I've no idea if the machine is catching these. Let's find out.

Good machine! Working tip-top.

---

# Original errors from previous implementation

Don't forget these include the parsing engine so you can be really specific.
And you want to test every error.

Holy shit this system is self-descriptive. :-)

// TODO Build indenting like 12.02 in to the parser! It's nice.

00-09     Errors about the errors
   01     Exceptions
   01.11  Project guard condition threw an error.
   01.12  Area guard condition threw an error.
   01.13  Category guard condition threw an error.
   01.14  ID guard condition threw an error.

10-19     Out-of-order and duplicate entry errors
> These are *essentially* the same error. If you follow `12` with `12` then you've generated JDE13.13. But for friendlier error reporting to the user, we make these specific errors.

   11     Projects

   12     Areas
   12.11  *An area which immediately follows a project can't be lower than*
          *a preceding area, because that area does not exist.*
   12.12  An area which immediately follows another area has an area number
          lower than the preceding area.
   12.13  An area which follows a category has an area number ~~lower~~
          not higher than the preceding area.
   12.14  An area which follows an ID has an area number lower than the
          preceding area.
   12.22  An area number was duplicated.
          - Note: new with the Userbase implementation.

   13 Categories
   13.11  *A category may not immediately follow a project. See **CODE***.
   13.12  *A category which immediately follows an area can't be lower than*
          *the preceding category, because that category does not exist.*
   13.13  A category which immediately follows another category has a category
          number ~~lower~~ not higher than than the preceding category.
   13.14  A category which follows an ID has a category number lower than the
          preceding category.
   13.23  A category number was duplicated.
          - Note: new with the Userbase implementation.

   14 IDs
   14.11  *An ID can not immediately follow a project. See **CODE***.
   14.12  *An ID can not immediately follow an area. See **CODE**.*
   14.13  *An ID which immediately follows a category can't be lower than*
          *a preceding ID, because that ID does not exist.*
   14.14  An ID which follows an ID has an ID ~~lower~~ not higher than
          the preceding ID.
   14.24  An ID number was duplicated.
          - Note: new with the Userbase implementation.

20-29     Ownership errors
   21     Projects

   22     Areas

   23     Categories
   23.01  A category was detected as the first item in the database.
   23.22  A category does not belong to its parent area.

   24     IDs
   24.01  An ID was detected as the first item in the database.
   24.23  An ID does not belong to its parent category.
   
30-39     Missing errors

40-49     Invalid input errors
   41     Projects
   42     Areas
   43     Categories
   44     IDs 