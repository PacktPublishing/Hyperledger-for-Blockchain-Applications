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
