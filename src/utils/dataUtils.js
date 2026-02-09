/**
 * dataUtils.js
 * Utilities for processing and normalizing portfolio/blog data.
 */

/**
 * Automatically generates IDs for items in an array if they are missing.
 * Uses a prefix and the index to ensure uniqueness within the list.
 * @param {Array} data - Array of objects to process
 * @param {string} prefix - ID prefix (e.g., 'p' for projects, 'b' for blog)
 * @returns {Array} - Processed array with IDs
 */
export const withIds = (data, prefix) => {
    if (!data || !Array.isArray(data)) return [];

    return data.map((item, index) => {
        if (item.id) return item;
        // Deterministic ID based on title (fallback to index if no title)
        const slug = item.title
            ? item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
            : index;

        return {
            ...item,
            id: `${prefix}-${slug}`
        };
    });
};

/**
 * Normalizes portfolio projects, merging ML and Fullstack lists and adding IDs.
 * @param {Object} projects - projects object from portfolioData
 * @returns {Array} - Flattened, unique, identified project list
 */
export const processProjects = (projects) => {
    const ml = withIds(projects.ml, 'p_ml');
    const fullstack = withIds(projects.fullstack, 'p_fs');

    // Merge and deduplicate by some property if needed, but here we just return them identified
    return {
        ml,
        fullstack,
        all: [...ml, ...fullstack]
    };
};
