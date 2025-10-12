-- Add latitude and longitude columns to assets table
ALTER TABLE public.assets 
ADD COLUMN IF NOT EXISTS latitude double precision,
ADD COLUMN IF NOT EXISTS longitude double precision;

-- Add index for geospatial queries (optional but recommended for performance)
CREATE INDEX IF NOT EXISTS idx_assets_coordinates ON public.assets (latitude, longitude);

-- Add comment to describe the columns
COMMENT ON COLUMN public.assets.latitude IS 'Latitude coordinate for the asset location';
COMMENT ON COLUMN public.assets.longitude IS 'Longitude coordinate for the asset location';

