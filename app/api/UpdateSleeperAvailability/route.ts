import dbConnection from '@/lib/dbConnection';
import SleeperAvailability from '../../../models/SleeperAvailability';
import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';
import  {stringify}  from 'fast-csv';

export async function POST(req:Request) {
    await dbConnection()
    try {
        const previousDay = new Date();
        previousDay.setDate(previousDay.getDate() - 1);

        // Fetch previous day's data
        const dataToDownload = await SleeperAvailability.find({ date: previousDay }).lean();

        if (dataToDownload.length > 0) {
            const filePath = path.join(
                process.cwd(),
                'public',
                `sleeperAvailability_${format(previousDay, 'yyyy-MM-dd')}.csv`
            );
            const writableStream = fs.createWriteStream(filePath);

            // Convert JSON data to CSV format and write to a file
            stringify(dataToDownload, { headers: true })
                .pipe(writableStream)
                .on('finish', () => {
                    console.log('CSV file created successfully');
                })
                .on('error', (err) => {
                    console.error('Error creating CSV file:', err);
                });
        }

        // Update dates and reset availability
        const today = new Date();
        await SleeperAvailability.updateMany(
            { date: previousDay },
            { $set: { date: today, "seats.$[].isAvailable": true } }
        );

        return new Response(JSON.stringify({ message: 'Sleeper availability updated successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error in sleeper availability update:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}
