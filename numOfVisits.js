const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3001; // You can change this to any port you prefer

app.use(cookieParser());

// Function to format date in the desired format
function formatDate(date) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    // const day = date.getDate();
    const time = date.toTimeString().split(' ')[0];
    // const year = date.getFullYear();
    const timeZone = "EST";

    return `${dayOfWeek}  ${month} ${date.getDate()}  ${time}  ${timeZone}  ${date.getFullYear()}`;
}

app.get('/', (req, res) => {
    let visits = req.cookies.visits ? parseInt(req.cookies.visits) : 0;
    let lastVisit = req.cookies.lastVisit ? new Date(req.cookies.lastVisit) : null;

    visits += 1;
    res.cookie('visits', visits);
    res.cookie('lastVisit', new Date());

    let message;

    if (visits === 1) {
        message = "Welcome to my webpage! It is your first time that you are here.";
    } else {
        const lastVisitFormatted = formatDate(lastVisit);
        message = `Hello, this is the ${visits} time that you are visiting my webpage.<br>Last time you visited my webpage on: ${lastVisitFormatted}`;
    }

    res.send(message);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
