import  Puppeteer  from "puppeteer";
import file from "fs";

const WebScrapping = async() =>{
    const browser = await Puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto("https://karansingh07.netlify.app/");
    
    // Section for Create Pdf of Page
    // const pdf =await page.pdf({path:"page.pdf", format:"A4"});

    // Section for all links 
    const allLinks = await page.evaluate(() =>{Array.from(document.querySelectorAll("a"), (e)=>e.href)});

    // Save file Links Details JSON 
    file.writeFile("Link.json", JSON.stringify(allLinks), (err) =>{
        if(err) throw err;
        console.log("File Saved");
    });

    console.log(allLinks);

    const grabData = await page.evaluate(() =>{
        const author = document.querySelector(".navMenu");
        return author.textContent;
    });
    
    return grabData;
    await browser.close();
};
WebScrapping();