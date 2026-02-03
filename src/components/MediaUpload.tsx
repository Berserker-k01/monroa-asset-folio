import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, X, Image as ImageIcon, Video, File } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { isDemoMode } from "@/lib/demoMode";

interface MediaUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxFiles?: number;
  acceptVideo?: boolean;
}

const MediaUpload = ({ images, onImagesChange, maxFiles = 10, acceptVideo = true }: MediaUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (files.length === 0) return;

    // Check max files
    if (images.length + files.length > maxFiles) {
      toast({
        title: "Limite atteinte",
        description: `Vous ne pouvez ajouter que ${maxFiles} fichiers maximum`,
        variant: "destructive",
      });
      return;
    }

    // Mode démo - simuler l'upload avec des URLs de placeholder
    if (isDemoMode()) {
      const newImages = files.map((file, index) => {
        const isVideo = file.type.startsWith('video/');
        if (isVideo) {
          return `https://via.placeholder.com/800x600/7FC8A9/FFFFFF?text=Video+${index + 1}`;
        }
        return URL.createObjectURL(file);
      });
      onImagesChange([...images, ...newImages]);
      toast({
        title: "Fichiers ajoutés (Mode Démo)",
        description: `${files.length} fichier(s) ajouté(s)`,
      });
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`${file.name} est trop volumineux (max 10MB)`);
        }

        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `assets/${fileName}`;

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('assets-media')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('assets-media')
          .getPublicUrl(filePath);

        return publicUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      onImagesChange([...images, ...uploadedUrls]);

      toast({
        title: "Upload réussi",
        description: `${files.length} fichier(s) uploadé(s)`,
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Erreur d'upload",
        description: error.message || "Impossible d'uploader les fichiers",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const isVideo = (url: string) => {
    return url.includes('Video') || url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mov');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptVideo ? "image/*,video/*" : "image/*"}
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || images.length >= maxFiles}
        >
          <Upload className="h-4 w-4 mr-2" />
          {uploading ? "Upload en cours..." : "Ajouter des médias"}
        </Button>
        <span className="text-sm text-muted-foreground">
          {images.length}/{maxFiles} fichiers
        </span>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((url, index) => (
            <Card key={index} className="relative group overflow-hidden">
              <div className="aspect-square bg-muted">
                {isVideo(url) ? (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                    <Video className="h-12 w-12 text-primary" />
                  </div>
                ) : (
                  <img
                    src={url}
                    alt={`Media ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="absolute bottom-2 left-2">
                {isVideo(url) ? (
                  <div className="bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                    <Video className="h-3 w-3" />
                    Vidéo
                  </div>
                ) : (
                  <div className="bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                    <ImageIcon className="h-3 w-3" />
                    Image
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Formats acceptés : {acceptVideo ? 'Images (JPG, PNG, WebP) et Vidéos (MP4, WebM)' : 'Images (JPG, PNG, WebP)'}. Max 10MB par fichier.
      </p>
    </div>
  );
};

export default MediaUpload;

