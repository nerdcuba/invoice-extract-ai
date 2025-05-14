
import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfigModal = ({ isOpen, onClose }: ConfigModalProps) => {
  const { config, setConfig } = useAppContext();
  const [formState, setFormState] = useState({
    webhookUrl: config.webhookUrl,
    supabaseUrl: config.supabaseUrl,
    supabaseKey: config.supabaseKey,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setConfig(formState);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>API Configuration</DialogTitle>
          <DialogDescription>
            Set up your n8n webhook URL and Supabase credentials
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="webhookUrl">n8n Webhook URL</Label>
            <Input
              id="webhookUrl"
              name="webhookUrl"
              placeholder="https://n8n.example.com/webhook/..."
              value={formState.webhookUrl}
              onChange={handleChange}
            />
            <p className="text-sm text-gray-500">
              Your n8n webhook URL that processes the bank statement
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="supabaseUrl">Supabase URL</Label>
            <Input
              id="supabaseUrl"
              name="supabaseUrl"
              placeholder="https://your-project.supabase.co"
              value={formState.supabaseUrl}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="supabaseKey">Supabase Anon Key</Label>
            <Input
              id="supabaseKey"
              name="supabaseKey"
              type="password"
              placeholder="your-supabase-anon-key"
              value={formState.supabaseKey}
              onChange={handleChange}
            />
            <p className="text-sm text-gray-500">
              Your public Supabase anon key (not the service key)
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
          >
            Save Configuration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
