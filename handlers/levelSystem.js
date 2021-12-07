const Canvas = require('canvas');
const mysql = require('mysql');
module.exports = async (client) => {
    const applyText = (canvas, text) => {
        const context = canvas.getContext('2d');
    
        // Declare a base size of the font
        let fontSize = 70;
    
        do {
            // Assign the font to the context and decrement it so it can be measured again
            context.font = `${fontSize -= 10}px sans-serif`;
            // Compare pixel width of the text to the canvas minus the approximate avatar size
        } while (context.measureText(text).width > canvas.width - 300);
    
        // Return the result to use in the actual canvas
        return context.font;
    };

    function calculatePercent(xp, nextPl) {
        return (xp / nextPl) * 100;
    }

    client.levelSystem = async function (message) {
        const user = await client.users.get(message.author.id);
        let xp = Math.round(Math.random() * (10 - 1) + 1) + user.xp;
        console.log(`userXp: ${user.xp}`);
        if (xp > user.nextLevelXp) {
            if(user.currentLevel === 50) {
                const prestige = user.prestige + 1;
                let sql = "UPDATE Users SET xp = 0, currentLevel = 1, nextLevelXp = 100, prestige = ? WHERE userID = ?";
                let inserts = [prestige, message.author.id];
                sql = mysql.format(sql, inserts);
                client.con.query(sql);
                message.channel.send(`${message.author.username} has reached level 50 and is now Level 1, Prestige ${prestige}!`);
            }else{
                user.nextLevelXp = Math.round(user.nextLevelXp * 1.10 + (user.prestige / 5));
                let sql = "UPDATE Users SET xp = 0, currentLevel = ?, nextLevelXp = ? WHERE userID = ?"
                let inserts = [user.currentLevel + 1, user.nextLevelXp, message.author.id];
                sql = mysql.format(sql, inserts);
                client.con.query(sql);
            }
        }else{
            console.log(`Updated userXp: ${xp}`);
            let sql = "UPDATE Users SET xp = ? WHERE userID = ?"
            let inserts = [xp, message.author.id];
            sql = mysql.format(sql, inserts);
            client.con.query(sql);
        }   
    }

    client.userProfile = async function (user) {
        const userResults = await client.users.get(user.id);
        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');
        let percentage = calculatePercent(userResults.xp, userResults.nextLevelXp) * 4;
        if(user.donor !== null){
            ctx.fillStyle = user.profileColor;
            ctx.beginPath();
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.closePath();
            ctx.font = applyText(canvas, `${user.username}`);
            ctx.fillStyle = user.textColor ? user.textColor : '#FFFFFF';
            ctx.fillText(`${user.username}`, canvas.width / 2.5, canvas.height / 2.3);
        }else{
            ctx.fillStyle = "#1c1c1c";
            ctx.beginPath();
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.closePath();
            ctx.font = applyText(canvas, `${user.username}`);
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText(`${user.username}`, canvas.width / 2.5, canvas.height / 2.3);
        }
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = "2";
        ctx.beginPath();
        ctx.rect(canvas.width / 2.5, canvas.height / 1.7, 400, 20);
        ctx.stroke();
        // draw progress
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = "2";
        ctx.beginPath();
        ctx.fillRect(canvas.width / 2.5, canvas.height / 1.7, percentage, 20);
        ctx.stroke();
        // draw percentage
        ctx.font = "15px sans-serif";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(`${Math.floor(calculatePercent(userResults.xp, userResults.nextLevelXp))}%`, canvas.width / 2.9, canvas.height / 1.55);
        // draw prestige
        ctx.font = "15px sans-serif";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(`Prestige: ${userResults.prestige}`, 240, canvas.height / 1.3);
        // draw level
        ctx.font = "15px sans-serif";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(`Level: ${userResults.currentLevel}`, 330, canvas.height / 1.3);
        // draw xp
        ctx.font = "15px sans-serif";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(`XP: ${userResults.xp}`, 400, canvas.height / 1.3);
        // draw next level xp
        ctx.font = "15px sans-serif";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(`Next Level XP: ${userResults.nextLevelXp}`, 460, canvas.height / 1.3);
        // draw avatar and make it circle
        const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }));
        ctx.drawImage(avatar, 25, 25, 200, 200);
        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        return {profileImage: canvas.toBuffer(), user: user};
    }
};