// increasing best way of code refactoring



//[1]

// module.exports= getDate;

// function getDate(){
//     let today= new Date();
        
//     var options= {
//         weekday:"long",
//         day: "numeric", 
//         month: "long"
//     };
//     let day=today.toLocaleDateString("en-US", options)

//     return day;
// }




//[2]  multiple exports in single module

// module.exports.getDate= getDate;

// function getDate(){
//     let today= new Date();
        
//     var options= {
//         weekday:"long",
//         day: "numeric", 
//         month: "long"
//     };
//     return today.toLocaleDateString("en-US", options)

// }

// module.exports.getDay= getDay;

// function getDay(){
//     let today= new Date();

//     var options= {
//         weekday:"long"
//     };

//     return today.toLocaleDateString("en-US", options);
// }



//[3]

// module.exports.getDate= getDate;

// var getDate= function (){
//     let today= new Date();
        
//     var options= {
//         weekday:"long",
//         day: "numeric", 
//         month: "long"
//     };
//     return today.toLocaleDateString("en-US", options)

// }

// module.exports.getDay= getDay;

// var getDay= function (){
//     let today= new Date();

//     var options= {
//         weekday:"long"
//     };

//     return today.toLocaleDateString("en-US", options);
// }




// [4]

// module.exports.getDate= function (){
//     let today= new Date();
        
//     var options= {
//         weekday:"long",
//         day: "numeric", 
//         month: "long"
//     };
//     return today.toLocaleDateString("en-US", options)

// }

// module.exports.getDay= function (){
//     let today= new Date();

//     var options= {
//         weekday:"long"
//     };

//     return today.toLocaleDateString("en-US", options);
// }





//[5]  using module.exports= exports     , this is exports shortcut in node js docs

// exports.getDate= function (){
//     let today= new Date();
        
//     var options= {
//         weekday:"long",
//         day: "numeric", 
//         month: "long"
//     };
//     return today.toLocaleDateString("en-US", options)

// }

// exports.getDay= function (){
//     let today= new Date();

//     var options= {
//         weekday:"long"
//     };

//     return today.toLocaleDateString("en-US", options);
// }






// MOST  refactored code

module.exports.getDate= function (){
    const today= new Date();
        
    const options= {
        weekday:"long",
        day: "numeric", 
        month: "long"
    };
    return today.toLocaleDateString("en-US", options)

}

module.exports.getDay= function (){
    const today= new Date();

    const options= {
        weekday:"long"
    };

    return today.toLocaleDateString("en-US", options);
}


// remember in js const for array and objects- by angela yu  timestamp- 19:06

