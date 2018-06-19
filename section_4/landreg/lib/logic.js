'use strict';
/**
 * Write your transction processor functions here
 */

const NS = 'org.landreg'

/**
 * Unlock landTitle so that it can be sold
 * @param {org.landreg.UnlockLandTitle} tx - The transaction instance
 * @transaction
 */
async function unlockLandTitle(tx) {
    // Get asset registery for landTitles
    const landTitleRegistry = await getAssetRegistry(NS + '.LandTitle');

    // Check if the landTitle is already for sale
    if (tx.landTitle.forSale) {
        throw new Error(`Land Title with id ${tx.landTitle.getIdentifier()} is already unlocked for sale`);
    }

    // Unlock asset to be for sale
    tx.landTitle.forSale = true;

    // Update the asset in the asset registry.
    await landTitleRegistry.update(tx.landTitle);
}

/**
 * Transfer land title from one owner to another
 * @param {org.landreg.TransferLandTitle} tx - The transaction instance
 * @transaction
 */
async function transferLandTitle(tx) {
    // Get asset registeries for landTitles and Individuals
    const landTitleRegistry = await getAssetRegistry(NS + '.LandTitle');
    const individualRegistry = await getParticipantRegistry(NS + '.Individual');

    // Check if the landTitle is not for sale
    if (!tx.landTitle.forSale) {
        throw new Error(`Land Title with id ${tx.landTitle.getIdentifier()} is not marked for sale`);
    }

    // Get newOwner
    const newOwnerID = tx.newOwner.getIdentifier();
    const oldOwnerID = tx.landTitle.owner.getIdentifier();

    // Make sure that new owner exists
    const newOwner = await individualRegistry.get(newOwnerID);

    // Check that newOwner is not same as current owner
    if (newOwnerID == oldOwnerID) {
        throw new Error(`Land Title with id ${tx.landTitle.getIdentifier()} is already owned by ${oldOwnerID}`);
    }

    // Add current landTitle owner to previousOwners array
    tx.landTitle.previousOwners.push(tx.landTitle.owner);

    // Update land title with new owner
    tx.landTitle.owner = tx.newOwner;

    // Set land title as not for sale anymore
    tx.landTitle.forSale = false;

    // Update the asset in the asset registry.
    await landTitleRegistry.update(tx.landTitle);
}
