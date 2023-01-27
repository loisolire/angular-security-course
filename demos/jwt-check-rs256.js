
var jwt = require('jsonwebtoken');
var fs = require('fs');


// verify an existing JWT
var existingToken = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWxpY2UiLCJpYXQiOjE2NzQ5MTQ5ODMsImV4cCI6MTY3NDkxNTEwMywic3ViIjoiMSJ9.uv-Q7j_gyc1Ovhl3-Otvu0ZfU_p2CdXPJJp1klXyY2KTd1mOeq2myYno2OofTP9OJZ58qxEucu9_gDubndU9GhuUhxT3v_gTZe3Vqcc5u4y-vkVjweJuBmcVsu2Il_NnRzlpaaWwmkOo79MrP9W6Hr2AvS8zTcZwozZa1RkszMWS5t-UX2qgBc8Cw2Na6iNDaSXdiPVQ-ZshrKfUk6ksE8JYSuBmHAHFBtCH_JiJjCwARwIY5KdJVzCkYA8f8Z-Qh81Gkk_COCuGeOUaQ_-V5kqd8svx_xCJie_XOZ_MIrkiX5MMJ_Qh3sAi9pvcL_IsZEcCVDbpeha577fyqccQow`;


var publicKey = fs.readFileSync('./demos/public.key');


console.log("verifying");

const verify = jwt.verify(existingToken, publicKey);



console.log("Decoded JWT:", verify);

