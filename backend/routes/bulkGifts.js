import express from 'express';
import BulkOrder from '../models/BulkOrder.js';
import Gift from '../models/Gift.js';
import { sendGiftNotification } from '../services/email.js';

const router = express.Router();

// Create bulk order and gifts
router.post('/', async (req, res) => {
    try {
        const { giftType, quantity, senderName, recipientMode, recipients, message, basePrice, discount, totalPrice } = req.body;

        if (!giftType || !quantity || quantity < 3) {
            return res.status(400).json({ error: 'Invalid bulk order data' });
        }

        const giftTypePrices = {
            tree: 1,
            ocean: 2,
            water: 3,
            cookstove: 5,
            coral: 5,
            rainforest: 7,
            wildlife: 8,
            solar: 10
        };

        // Create bulk order record
        const bulkOrder = new BulkOrder({
            giftType,
            quantity,
            senderName,
            message,
            recipientMode,
            recipients: recipients || [],
            basePrice,
            discount,
            totalPrice,
            paymentStatus: 'paid'
        });

        await bulkOrder.save();

        // Create individual gifts
        const giftIds = [];
        const pricePerGift = giftTypePrices[giftType] || 1;

        if (recipientMode === 'same') {
            // Create identical gifts
            for (let i = 0; i < quantity; i++) {
                const gift = new Gift({
                    type: giftType,
                    quantity: 1,
                    message: message,
                    recipientName: `Recipient ${i + 1}`,
                    recipientEmail: '',
                    senderName: senderName,
                    totalCost: pricePerGift,
                    status: 'sent',
                    showInGallery: false
                });
                await gift.save();
                giftIds.push(gift._id);
            }
        } else {
            // Create personalized gifts
            for (let i = 0; i < quantity; i++) {
                const recipient = recipients[i] || { name: `Recipient ${i + 1}`, email: '' };
                const gift = new Gift({
                    type: giftType,
                    quantity: 1,
                    message: message,
                    recipientName: recipient.name || `Recipient ${i + 1}`,
                    recipientEmail: recipient.email || '',
                    senderName: senderName,
                    totalCost: pricePerGift,
                    status: 'sent',
                    showInGallery: false
                });
                await gift.save();
                giftIds.push(gift._id);

                // Send email if recipient has email
                if (recipient.email) {
                    const giftUrl = `${process.env.FRONTEND_URL || 'http://localhost:5174'}/gift/${gift._id}`;
                    await sendGiftNotification(gift, giftUrl);
                }
            }
        }

        bulkOrder.giftIds = giftIds;
        await bulkOrder.save();

        return res.json({
            success: true,
            bulkOrderId: bulkOrder._id,
            giftIds: giftIds,
            message: 'Bulk gifts created successfully'
        });
    } catch (error) {
        console.error('Bulk order error:', error);
        res.status(500).json({ error: 'Failed to create bulk order' });
    }
});

// Get bulk order details
router.get('/:bulkOrderId', async (req, res) => {
    try {
        const bulkOrder = await BulkOrder.findById(req.params.bulkOrderId).populate('giftIds');

        if (!bulkOrder) {
            return res.status(404).json({ error: 'Bulk order not found' });
        }

        const gifts = await Gift.find({ _id: { $in: bulkOrder.giftIds } });

        res.json({ bulkOrder, gifts });
    } catch (error) {
        console.error('Error fetching bulk order:', error);
        res.status(500).json({ error: 'Failed to fetch bulk order' });
    }
});

export default router;
