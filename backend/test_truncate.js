// Export the truncateMetadataValue function for testing
const truncateMetadataValue = (value) => {
  if (!value || typeof value !== 'string') {
    return value?.toString() || '';
  }
  return value.length > 500 ? value.substring(0, 500) : value;
};

export { truncateMetadataValue };