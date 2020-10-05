import puppeteer from 'puppeteer'
import chalk from 'chalk'
import fs from 'fs'

const error = chalk.bold.red
const success = chalk.keyword('green')

export const getListHadits = async () => {
    try {
        let browser = await puppeteer.launch({
            handless: true
        })

        const page = await browser.newPage();
        // enter url in page
        await page.goto(`http://core.carihadis.com/`);
        await page.waitForSelector("table tbody");
        await page.screenshot({path: 'src/public/schreenshoot.png'});

        var dataHadits = await page.evaluate(() => {
            const dataObject = [];
            var tbody = document.querySelectorAll('table tbody');
            for (let i = 1; i < tbody[0].rows.length; i += 1) {
                dataObject.push({
                    number: tbody[0].rows[i].cells[0].innerText,
                    name: tbody[0].rows[i].cells[1].innerText,
                    totalHadits: tbody[0].rows[i].cells[2].innerText,
                })
            }
            return dataObject;
        });
        console.log(dataHadits);
        await browser.close();
        fs.writeFile("src/public/data_hadits.json", JSON.stringify(dataHadits), function(err) {
          if (err) throw err;
          console.log("Saved!");
          return res.send({
              message: 'Success'
          })
        });
        console.log(success("Browser Closed"));
    } catch (err) {
        console.log(error(err))
        // await browser.close();
        console.log(error("Browser Closed"));
    }
}
