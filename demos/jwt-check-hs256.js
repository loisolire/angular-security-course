
var jwt = require('jsonwebtoken');


// verify an existing JWT
var existingToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.kK9JnTXZwzNo3BYNXJT57PGLnQk-Xyu7IBhRWFmc4C0';


var secretKey = 'secret-key';

const verify = jwt.verify(existingToken, secretKey);


console.log("Decoded JWT:", verify);





