// Graphical Commands

# Welcome to GraphiQL
#
# GraphiQL is an in-browser tool for writing, validating, and
# testing GraphQL queries.
#
# Type queries into this side of the screen, and you will see intelligent
# typeaheads aware of the current GraphQL type schema and live syntax and
# validation errors highlighted within the text.
#
# GraphQL queries typically start with a "{" character. Lines that start
# with a # are ignored.
#
# An example GraphQL query might look like:
#
#     {
#       field(arg: "value") {
#         subField
#       }
#     }
#
# Keyboard shortcuts:
#
#  Prettify Query:  Shift-Ctrl-P (or press the prettify button above)
#
#     Merge Query:  Shift-Ctrl-M (or press the merge button above)
#
#       Run Query:  Ctrl-Enter (or press the play button above)
#
#   Auto Complete:  Ctrl-Space (or just start typing)
#


query findCompany{ #query findCompany is just specifying
  apple: company(id: "1"){
    ...companyDetails
  }
  google: company(id: "2"){ #need google: and apple:because you cannot have duplicate keys
    ...companyDetails
  }
}
query fragments are a list of elements so no need to keep duplicating
fragment companyDetails on Company{
  id 
  name 
  description
}
mutations can be used to delete, update, and create records
mutation{
  addUser(firstName:"Steven", age: 28){
    id 
    firstName
    age
  }
}

mutation{
	deleteUser(id: "RlyGgMI"){
    id
  }
}

mutation{
  editUser(id: "40", age: 10){
		id
    age
    firstName
  }
}