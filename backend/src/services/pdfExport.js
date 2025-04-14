const PDFDocument = require('pdfkit');
const mealPlanService = require('./mealPlan');
const PdfResponse = require('../utils/classes/PdfResponse');
const PDF = require('../utils/classes/PDF');

const mealPlan = async (id, userId) => {
    const data = await mealPlanService.getByIdAndUserId(id, userId);

    const doc = new PDFDocument();
    const buffers = [];

    doc.on('data', buffers.push.bind(buffers));

    doc.fontSize(22).text(data.name, { align: 'center' });
    doc.moveDown(1);
    doc.fontSize(16).text(`${data.mealsPerDay} meals per day`);
    doc.moveDown(0.1);
    doc.fontSize(16).text(`Restrictions: ${data.restrictions.join(', ')}`);
    doc.moveDown(0.5);

    data.days.forEach((day) => {
        doc.fontSize(16).text(`${day.name}`, { align: 'center' });
        doc.moveDown(0.5);
        doc.fontSize(14).text(`${day.description}`);
        doc.moveDown(0.5);
        doc.fontSize(14).text(
            `${day.dailyCaloricTarget}kcal | ${day.dailyMacros.protein}g protein | ${day.dailyMacros.carb}g carb | ${day.dailyMacros.fat}g fat`
        );
        doc.moveDown(1.5);
        day.meals.forEach((meal) => {
            doc.fontSize(14).text(`${meal.name} - ${meal.type}`);
            doc.moveDown(0.5);
            doc.fontSize(12).text(`${meal.description}`);
            doc.moveDown(0.5);
            doc.fontSize(12).text(
                `${meal.kcal}kcal | ${meal.protein}g protein | ${meal.carb}g carb | ${meal.fat}g fat | ${meal.fibre}g fibre | ${meal.salt}g salt`
            );
            doc.moveDown(1.5);
        });
        doc.moveDown(1);
    });

    doc.end();

    return new Promise((resolve) => {
        doc.on('end', () => {
            const pdfBuffer = Buffer.concat(buffers);
            resolve(pdfBuffer);
        });
    });
};

module.exports = { mealPlan };
