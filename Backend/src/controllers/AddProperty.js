import Property from '../models/property.js'
import { validationResult } from 'express-validator';


export class AddProperty {
// POST /api/properties - Create new listing (owners only) ✨
    static async createProperty(req, res) {
     //   console.log('Raw req.body:', JSON.stringify(req.body, null, 2));
  //const userId = req.user.id; 
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: errors.array()
                });
            }

       

            const propertyData = {
                ...req.body,
                
                //ownerId: req.user._id,
               // adId,
                views: { total: 0, unique: 0, daily: [] },
                interestedUsers: [],
                isActive: true,
                isFeatured: false,
                isVerified: false,
                moderationStatus: 'pending',
                rejectionReason: '',

                postedDate: new Date(),
                expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 90 days
                createdAt: new Date(),
                updatedAt: new Date()
            };
//              const wallet = await Wallet.findOne({ userId });

//   if (!wallet || wallet.points < 10) {
//     return res.status(400).json({ message: 'Insufficient points' });
//   }
   console.log('Property data:', propertyData);
            const property = new Property(propertyData);
            console.log('New property instance:', property);
            await property.save();
//  wallet.points -= 10;
//   await wallet.save();
            //await property.populate('ownerId', 'fullName avatar isVerified');

            res.status(201).json({
                success: true,
                message: 'Property listed successfully! Pending admin approval.',
                data: property
            });

        } catch (error) {
            console.error('Create property error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create property listing',
                error: error.message
            });
        }
    }
}