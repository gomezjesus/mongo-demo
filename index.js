const moongose = require("mongoose");

moongose
  .connect("mongodb://localhost/playground", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const courseSchema = new moongose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});
const Course = moongose.model("Course", courseSchema);
async function createCourse() {
  const course = new Course({
    name: "AWS Course",
    author: "Jesus G",
    tags: ["cloud", "amazon", "aws", "computing"],
    isPublished: true,
  });

  const result = await course.save();

  console.log(result);
}

async function getCourses() {
  const courses = await Course.find({ author: "Jesus G", isPublished: true })
    //.find({ price: { $gte: 10, $lte: 20 } })
    //Starts with Jesu
    .find({ author: /^Jesu/ })

    //ends with G an 'i' at the end to declare case insensitive
    .find({ author: /G$/i })

    //Contains Jesus
    .find({ author: /.*Jesu.*/i })

    //.or([{ author: "Jesus" }, { isPublished: true }])
    //.and([{}])
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  // .find({ price: { $in: [10, 15, 20] } })
  console.log(courses);
}

//createCourse();
getCourses();
