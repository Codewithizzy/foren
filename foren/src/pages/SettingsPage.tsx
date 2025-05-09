import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  Switch,
  Slider , 
  FormControlLabel, 
  TextField, 
  Button, 
  Grid, 
  Divider, 
  MenuItem, 
  Select, 
  InputLabel, 
  FormControl, 
  Alert, 
  Paper,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Badge,
  Chip,
  CircularProgress,
  Tooltip
} from '@mui/material';
import {
  DarkMode,
  LightMode,
  Language,
  TextFields,
  Email,
  Save,
  Person,
  Lock,
  Notifications,
  Security,
  Api,
  Storage,
  CreditCard,
  Delete,
  Download,
  Upload,
  Help,
  Logout,
  CheckCircle,
  Warning,
  Info,
  Error,
  Close,
  ExpandMore,
  ChevronRight,
  QrCode,
  VerifiedUser,
  CloudUpload,
  CloudDownload,
  Payment,
  Receipt,
  RestartAlt,
  History
} from '@mui/icons-material';

interface SettingsPageProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
    plan: string;
    lastLogin: string;
  };
  onSave?: (settings: any) => void;
  onLogout?: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ user, onSave, onLogout }) => {
  // State management
  const [tabIndex, setTabIndex] = useState(0);
  const [settings, setSettings] = useState({
    darkMode: false,
    language: 'en',
    fontSize: 16,
    notificationEnabled: true,
    notificationFrequency: 'immediate',
    emailNotifications: true,
    pushNotifications: true,
    twoFactorEnabled: false,
    deactivateAccount: false,
    apiKey: '',
    dataAutoDelete: false,
    dataRetentionDays: 30
  });
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [alerts, setAlerts] = useState<{type: 'success' | 'error' | 'info' | 'warning', message: string}[]>([]);
  const [openDialog, setOpenDialog] = useState({
    deactivate: false,
    reset: false,
    logout: false,
    twoFactor: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);

  // Handle setting changes
  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Handle password change
  const handlePasswordChange = () => {
    if (password.new !== password.confirm) {
      addAlert('error', 'Passwords do not match!');
      return;
    }
    if (password.new.length < 8) {
      addAlert('error', 'Password must be at least 8 characters!');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      addAlert('success', 'Password updated successfully!');
      setPassword({ current: '', new: '', confirm: '' });
    }, 1500);
  };

  // Add alert message
  const addAlert = (type: 'success' | 'error' | 'info' | 'warning', message: string) => {
    setAlerts(prev => [...prev, { type, message }]);
    setTimeout(() => {
      setAlerts(prev => prev.slice(1));
    }, 5000);
  };

  // Save all settings
  const saveSettings = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      addAlert('success', 'Settings saved successfully!');
      onSave?.(settings);
    }, 1000);
  };

  // Generate 2FA QR code (simulated)
  const generateTwoFactorAuth = () => {
    setIsLoading(true);
    // Simulate QR code generation
    setTimeout(() => {
      setQrCodeUrl('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/Example:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=Example');
      setBackupCodes([
        'ABCD-1234',
        'EFGH-5678',
        'IJKL-9012',
        'MNOP-3456',
        'QRST-7890'
      ]);
      setIsLoading(false);
      setOpenDialog({ ...openDialog, twoFactor: true });
    }, 1000);
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
      {/* Header with user info */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar 
          src={user?.avatar} 
          sx={{ width: 64, height: 64, mr: 2 }}
        >
          {user?.name.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="h4">{user?.name || 'User Settings'}</Typography>
          <Typography variant="body1" color="text.secondary">
            {user?.email} • {user?.plan} Plan
          </Typography>
        </Box>
        <Button 
          variant="outlined" 
          startIcon={<Logout />} 
          sx={{ ml: 'auto' }}
          onClick={() => setOpenDialog({ ...openDialog, logout: true })}
        >
          Logout
        </Button>
      </Box>

      {/* Tabs for different categories */}
      <Paper elevation={2} sx={{ mb: 3 }}>
        <Tabs 
          value={tabIndex} 
          onChange={(e, newValue) => setTabIndex(newValue)} 
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          <Tab label="Preferences" icon={<DarkMode />} />
          <Tab label="Account" icon={<Person />} />
          <Tab label="Notifications" icon={<Notifications />} />
          <Tab label="Security" icon={<Security />} />
          <Tab label="Integrations" icon={<Api />} />
          <Tab label="Data" icon={<Storage />} />
          <Tab label="Billing" icon={<CreditCard />} />
        </Tabs>
      </Paper>

      {/* Alerts */}
      <Box sx={{ mb: 3 }}>
        {alerts.map((alert, index) => (
          <Alert 
            key={index}
            severity={alert.type}
            sx={{ mb: 1 }}
            onClose={() => setAlerts(prev => prev.filter((_, i) => i !== index))}
          >
            {alert.message}
          </Alert>
        ))}
      </Box>

      {/* Preferences Tab */}
      {tabIndex === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <DarkMode sx={{ mr: 1 }} /> Appearance
              </Typography>
              
              <FormControlLabel
                control={
                  <Switch 
                    checked={settings.darkMode} 
                    onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                    color="secondary"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {settings.darkMode ? <DarkMode sx={{ mr: 1 }} /> : <LightMode sx={{ mr: 1 }} />}
                    Dark Mode
                  </Box>
                }
                sx={{ mb: 2 }}
              />

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel><Language sx={{ mr: 1, fontSize: 20 }} />Language</InputLabel>
                <Select
                  value={settings.language}
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                  label="Language"
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Español</MenuItem>
                  <MenuItem value="fr">Français</MenuItem>
                  <MenuItem value="de">Deutsch</MenuItem>
                  <MenuItem value="ja">日本語</MenuItem>
                </Select>
              </FormControl>

              <Typography gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <TextFields sx={{ mr: 1 }} /> Font Size
              </Typography>
              <Slider
                value={settings.fontSize}
                onChange={(e, val) => handleSettingChange('fontSize', val)}
                min={12}
                max={24}
                step={1}
                marks={[
                  { value: 12, label: '12' },
                  { value: 16, label: '16' },
                  { value: 20, label: '20' },
                  { value: 24, label: '24' },
                ]}
                valueLabelDisplay="auto"
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Accessibility
              </Typography>
              <FormControlLabel
                control={<Switch />}
                label="High contrast mode"
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={<Switch />}
                label="Reduced motion"
              />
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Account Tab */}
      {tabIndex === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Profile Information
              </Typography>
              
              <TextField
                label="Name"
                fullWidth
                value={user?.name || ''}
                sx={{ mb: 2 }}
              />
              
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={user?.email || ''}
                sx={{ mb: 2 }}
              />
              
              <Button variant="contained">
                Update Profile
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Change Password
              </Typography>
              
              <TextField
                label="Current Password"
                type="password"
                fullWidth
                value={password.current}
                onChange={(e) => setPassword({...password, current: e.target.value})}
                sx={{ mb: 2 }}
              />
              
              <TextField
                label="New Password"
                type="password"
                fullWidth
                value={password.new}
                onChange={(e) => setPassword({...password, new: e.target.value})}
                sx={{ mb: 2 }}
              />
              
              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
                value={password.confirm}
                onChange={(e) => setPassword({...password, confirm: e.target.value})}
                sx={{ mb: 2 }}
              />
              
              <Button 
                variant="contained" 
                onClick={handlePasswordChange}
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : <Lock />}
              >
                Change Password
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Notifications Tab */}
      {tabIndex === 2 && (
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Notification Preferences
          </Typography>
          
          <FormControlLabel
            control={
              <Switch 
                checked={settings.notificationEnabled} 
                onChange={(e) => handleSettingChange('notificationEnabled', e.target.checked)}
                color="secondary"
              />
            }
            label="Enable Notifications"
            sx={{ mb: 2 }}
          />

          {settings.notificationEnabled && (
            <>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Notification Frequency</InputLabel>
                <Select
                  value={settings.notificationFrequency}
                  onChange={(e) => handleSettingChange('notificationFrequency', e.target.value)}
                  label="Notification Frequency"
                >
                  <MenuItem value="immediate">Immediate</MenuItem>
                  <MenuItem value="daily">Daily Digest</MenuItem>
                  <MenuItem value="weekly">Weekly Summary</MenuItem>
                </Select>
              </FormControl>

              <Typography variant="subtitle1" gutterBottom>
                Notification Channels
              </Typography>
              
              <FormControlLabel
                control={
                  <Switch 
                    checked={settings.emailNotifications} 
                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                  />
                }
                label="Email Notifications"
                sx={{ mb: 1 }}
              />
              
              <FormControlLabel
                control={
                  <Switch 
                    checked={settings.pushNotifications} 
                    onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                  />
                }
                label="Push Notifications"
              />

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle1" gutterBottom>
                Notification Types
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemText primary="System Updates" />
                  <ListItemSecondaryAction>
                    <Switch />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Security Alerts" />
                  <ListItemSecondaryAction>
                    <Switch defaultChecked />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText primary="New Features" />
                  <ListItemSecondaryAction>
                    <Switch />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </>
          )}
        </Paper>
      )}

      {/* Security Tab */}
      {tabIndex === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Security Settings
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Two-Factor Authentication" 
                    secondary={settings.twoFactorEnabled ? 'Enabled' : 'Disabled'} 
                  />
                  <ListItemSecondaryAction>
                    <Switch 
                      checked={settings.twoFactorEnabled} 
                      onChange={(e) => {
                        handleSettingChange('twoFactorEnabled', e.target.checked);
                        if (e.target.checked) generateTwoFactorAuth();
                      }}
                      color="secondary"
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Recent Devices" 
                    secondary="View and manage logged-in devices" 
                  />
                  <ListItemSecondaryAction>
                    <IconButton>
                      <ChevronRight />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Login History" 
                    secondary="Last login: Today at 14:30" 
                  />
                  <ListItemSecondaryAction>
                    <IconButton>
                      <ChevronRight />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Account Actions
              </Typography>
              
              <Button 
                variant="outlined" 
                color="error" 
                startIcon={<Delete />}
                fullWidth
                sx={{ mb: 2 }}
                onClick={() => setOpenDialog({ ...openDialog, deactivate: true })}
              >
                Deactivate Account
              </Button>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Deactivating your account will disable your profile and remove your name and photo from most content you've shared.
              </Typography>
              
              <Button 
                variant="contained" 
                color="primary"
                fullWidth
                onClick={saveSettings}
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : <Save />}
              >
                Save All Settings
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Integrations Tab */}
      {tabIndex === 4 && (
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            API & Integrations
          </Typography>
          
          <TextField
            label="API Key"
            fullWidth
            value={settings.apiKey}
            onChange={(e) => handleSettingChange('apiKey', e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => {
                    const newKey = `sk-${Math.random().toString(36).substring(2, 15)}`;
                    handleSettingChange('apiKey', newKey);
                    addAlert('success', 'New API key generated!');
                  }}
                >
                  Generate
                </Button>
              ),
            }}
          />

          <Button variant="contained" sx={{ mb: 3 }}>
            Save API Key
          </Button>

          <Divider sx={{ my: 3 }} />

          <Typography variant="subtitle1" gutterBottom>
            Connected Services
          </Typography>
          
          <List>
            <ListItem>
              <ListItemText primary="Google" secondary="Not connected" />
              <ListItemSecondaryAction>
                <Button variant="outlined">Connect</Button>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary="Slack" secondary="Not connected" />
              <ListItemSecondaryAction>
                <Button variant="outlined">Connect</Button>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Paper>
      )}

      {/* Data Tab */}
      {tabIndex === 5 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Data Management
              </Typography>
              
              <Button 
                variant="contained" 
                startIcon={<Download />}
                fullWidth
                sx={{ mb: 2 }}
              >
                Export Data
              </Button>
              
              <Button 
                variant="outlined" 
                startIcon={<Upload />}
                fullWidth
                sx={{ mb: 3 }}
              >
                Import Data
              </Button>

              <Divider sx={{ my: 2 }} />

              <FormControlLabel
                control={
                  <Switch 
                    checked={settings.dataAutoDelete} 
                    onChange={(e) => handleSettingChange('dataAutoDelete', e.target.checked)}
                  />
                }
                label="Auto-delete old data"
                sx={{ mb: 2 }}
              />

              {settings.dataAutoDelete && (
                <TextField
                  label="Data retention period (days)"
                  type="number"
                  fullWidth
                  value={settings.dataRetentionDays}
                  onChange={(e) => handleSettingChange('dataRetentionDays', Number(e.target.value))}
                  InputProps={{ inputProps: { min: 1, max: 365 } }}
                />
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Reset Settings
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Reset all settings to their default values. This will not affect your data.
              </Typography>
              
              <Button 
                variant="outlined" 
                color="error"
                startIcon={<RestartAlt />}
                fullWidth
                onClick={() => setOpenDialog({ ...openDialog, reset: true })}
              >
                Reset to Defaults
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Billing Tab */}
      {tabIndex === 6 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Subscription Plan
              </Typography>
              
              <Chip 
                label={user?.plan || ''} 
                color="primary" 
                variant="outlined"
                sx={{ mb: 2 }}
              />
              
              <List>
                
              </List>
              
              <Button 
                variant="contained" 
                fullWidth
                sx={{ mt: 2 }}
              >
                Upgrade Plan
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Billing History
              </Typography>
              
              <List>
                
            
              </List>
              
              <Button 
                variant="outlined" 
                fullWidth
                startIcon={<History />}
                sx={{ mt: 2 }}
              >
                View Full History
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* 2FA Setup Dialog */}
      <Dialog open={openDialog.twoFactor} onClose={() => setOpenDialog({...openDialog, twoFactor: false})}>
        <DialogTitle>
          <VerifiedUser sx={{ mr: 1, verticalAlign: 'middle' }} />
          Set Up Two-Factor Authentication
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Scan this QR code with your authenticator app or enter the code manually:
          </DialogContentText>
          
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <img src={qrCodeUrl} alt="QR Code" width={200} height={200} />
              </Box>
              
              <Typography variant="body2" align="center" sx={{ mb: 3 }}>
                Manual entry code: <strong>JBSWY3DPEHPK3PXP</strong>
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                Backup Codes (save these in a safe place):
              </Typography>
              <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                <Grid container spacing={1}>
                  {backupCodes.map((code, i) => (
                    <Grid item xs={6} key={i}>
                      <Typography fontFamily="monospace">{code}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
              
              <TextField
                label="Enter 6-digit code from your app"
                fullWidth
                sx={{ mt: 2 }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog({...openDialog, twoFactor: false})}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={() => {
              setOpenDialog({...openDialog, twoFactor: false});
              addAlert('success', 'Two-factor authentication enabled!');
            }}
          >
            Verify & Enable
          </Button>
        </DialogActions>
      </Dialog>

      {/* Deactivate Account Dialog */}
      <Dialog open={openDialog.deactivate} onClose={() => setOpenDialog({...openDialog, deactivate: false})}>
        <DialogTitle>Deactivate Account?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to deactivate your account? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog({...openDialog, deactivate: false})}>Cancel</Button>
          <Button 
            color="error"
            onClick={() => {
              setOpenDialog({...openDialog, deactivate: false});
              addAlert('warning', 'Account deactivation requested');
            }}
          >
            Deactivate
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reset Settings Dialog */}
      <Dialog open={openDialog.reset} onClose={() => setOpenDialog({...openDialog, reset: false})}>
        <DialogTitle>Reset All Settings?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will restore all settings to their default values. Your data will not be affected.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog({...openDialog, reset: false})}>Cancel</Button>
          <Button 
            color="primary"
            onClick={() => {
              setOpenDialog({...openDialog, reset: false});
              addAlert('success', 'Settings reset to defaults');
            }}
          >
            Reset
          </Button>
        </DialogActions>
      </Dialog>

      {/* Logout Dialog */}
      <Dialog open={openDialog.logout} onClose={() => setOpenDialog({...openDialog, logout: false})}>
        <DialogTitle>Logout?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog({...openDialog, logout: false})}>Cancel</Button>
          <Button 
            color="primary"
            onClick={() => {
              onLogout?.();
              setOpenDialog({...openDialog, logout: false});
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SettingsPage;