import Gift from '../models/Gift.js';

export async function createGift(giftData) {
  const gift = new Gift(giftData);
  await gift.save();
  return gift;
}

export async function getGift(id) {
  const gift = await Gift.findById(id);
  return gift;
}

export async function getAllGifts() {
  const gifts = await Gift.find().sort({ createdAt: -1 });
  return gifts;
}

export async function updateGift(id, updateData) {
  const gift = await Gift.findByIdAndUpdate(
    id, 
    updateData, 
    { new: true, runValidators: true }
  );
  return gift;
}

export async function deleteGift(id) {
  const result = await Gift.findByIdAndDelete(id);
  return !!result;
}
