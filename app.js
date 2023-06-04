const express= require('express');
const bodyParser= require('body-parser');
const date= require(__dirname+ '/date.js');  
// const date= require('./date');   
const mongoose= require('mongoose');

const _= require("lodash");


console.log(date);       // it returns the function as it is, w/o running it.
console.log(date.getDate(), "&" ,date.getDay());       // as it will trigger the function to run
const app= express();



app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static("public"));


// let items=["Buy Food", "Cook Food", "Eat Food"];
// let workItems=[];
//Instead of using these local array we are going to add the database

mongoose.connect('mongodb+srv://iharshmix:iharshmix@cluster0.yhmnm84.mongodb.net/todolistDB');


const itemSchema=new mongoose.Schema({
    name:String
});

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
    name:"Welcome to your todolist!"
})
const item2=new Item({
    name:"Hit the  + button to add a new item."
})
const item3=new Item({
    name:"<-- Hit this to delete an item"
})

const defaultItems= [item1,item2,item3];


const listSchema= new mongoose.Schema({
    name:String,
    itemsList: [itemSchema]
});

const List= mongoose.model("List", listSchema);



app.get('/', function(req, res){
    console.log(req.url);
    let day= date.getDate();
    // let day= date.getDay();
    
    Item.find().then((foundItems)=>{       // notice, here foundItems is the array of all existing documents in the items collection.
        if(foundItems.length==0){
            Item.insertMany(defaultItems).then(()=>{
                console.log("Successfully saved defaultItems in items collection")
            })
            
            res.redirect("/");     // ********** Most important key line, for this work

        } else {
            res.render('list', {listTitle:day , newListItems: foundItems});
        }
    })
})




app.post('/', function(req,res){
    console.log(req.body);                
    const itemName= req.body.newItem;
    const listName= req.body.listNameIdentifier;
    const day= date.getDate();

    const item= new Item({
        name: itemName
    });


    if(listName== day){
        item.save();
        res.redirect("/"); 
    } else{
        List.findOne({name: listName}).then((foundList)=>{
            foundList.itemsList.push(item);
            foundList.save();  // in mongoDB notes page 28, read about save() (If any doubt how this works.)
        })
        res.redirect("/"+listName);
    }

    



    // if(req.body.list=="Work List"){
    //     workItems.push(item);
    //     res.redirect('/work');
    // } else{
    //     items.push(item);
    //     res.redirect('/');
    // }
})


app.post('/delete', function(req,res){
    console.log(req.body);
    const checkedItemId=req.body.checkbox;
    const listName= req.body.listNameIdentifier;
    const day= date.getDate();


    if(listName== day){
        Item.findByIdAndRemove({_id: checkedItemId}).then(()=>{
            console.log("Item deleted successfully")
        });
        res.redirect('/');
    } else{   // case when listName is custom list 
        List.findOneAndUpdate({name: listName}, {$pull: {itemsList:{_id:checkedItemId}}}).then((foundList)=>{
            console.log("Item updated successfully")
        })
        res.redirect('/'+listName);
    }


})



app.get('/:customListName', function(req, res){
    console.log(req.params.customListName);

    const requestedListName= _.capitalize(req.params.customListName);


    List.findOne({name: requestedListName}).then((foundList)=>{   //*** notice foundList here is the document

        if(foundList){  // that means document exists , so just show the existing list

            //****** no need to make new ejs page, rather can use the existing list.ejs
            res.render('list', {listTitle:foundList.name , newListItems: foundList.itemsList});
        }

        else{       // that means document doesn't exists yet, and create new list
            const list= new List({
                name: requestedListName,
                itemsList: defaultItems
            });
            list.save();
            res.redirect('/'+requestedListName);
        }

    })

})







// app.get('/work', function(req, res){
//     res.render('list', {listTitle: "Work List", newListItems:workItems});
// } )

//this is not used, coz our FORM element of ejs template takes action on home route only, therefore write logic on home route app.post('/' . ----) method
// app.post('/work', function(req,res){
//     console.log(req.body);
//     let item= req.body.newItem;
//     workItems.push(item);

//     res.redirect('/work');
// })




app.get('/about', function(req,res){
    res.render('about');
})

app.listen(3000, function(){
    console.log("Listening on port 3000");
})