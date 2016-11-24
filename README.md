# hackwithix-hackathon (Friday, November 18)
I worked on this during #HackWithIX hackathon event. The theme of this hackathon was ad:tech and it involved advertising analytics tools, and design thinking.

My team's idea is giving options to view data with different types of chart. When a company provides data to customers, the data is usually given as a fixed chart or graph. However, some customers may want to see it in a different way. So our product gives four options to represent the data sent from server, which are line chart, scatter chart, bar chart, and pie chart. In this way, customers can customize the view of data. They can also pull multiple charts and view them at the same time.


### My work
\#HackWithIX provided two servers, one of which sends JSON data and the other one sends the index page. This is the github page they provided, https://github.com/indexexchange/hack-with-ix.
The following files are what I coded:
- ui/index.html
- ui/style.css
- ui/query.js


### How to run
1. In 'api' directory, run `npm install` and run `node server.js`
2. In 'ui' directory, run `npm install` and run `node server.js`
3. Go to http://localhost:3000/ for the interface.


### Query inputs
- datacenter: NA, EU, AS
- server: NA0001, NA0002, NA0003, NA0004, NA0005, EU0001, EU0002, EU0003, EU0004, AS0001, AS0002, AS0003


### User Interface
![ui2](https://cloud.githubusercontent.com/assets/16660829/20610553/5573457a-b269-11e6-93db-9b16dc58822a.png)
![ui](https://cloud.githubusercontent.com/assets/16660829/20610507/c65d0eca-b268-11e6-91e2-b187147e71bb.png)
