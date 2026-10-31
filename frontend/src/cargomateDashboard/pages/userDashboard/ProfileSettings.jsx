import React, { useState } from 'react';
import { 
  Camera, ShieldCheck, Mail, MessageSquare, Bell, FileText, 
  Lock, Shield, Smartphone, KeyRound, Calendar, UserCheck, 
  Gem, CheckCircle2, Circle, ChevronDown, ExternalLink,
  Clock
} from 'lucide-react';
import Swal from 'sweetalert2';

export default function ProfileSettingsDashboard() {
  const [formData, setFormData] = useState({
    fullName: 'Arjun Soni',
    email: 'arjun.soni@asdcargomate.com',
    phone: '+91 22 1234 5678',
    designation: 'Exporter',
    companyName: 'IndiGo Cargo',
    gstin: '27ABCDE1234F1Z5',
    country: 'India',
    city: 'Mumbai',
    officeAddress: '2nd Floor, Trade Center, Bandra Kurla Complex, Mumbai, Maharashtra - 400051'
  });

  const [preferences, setPreferences] = useState({
    emailNotif: true,
    smsNotif: true,
    inAppNotif: true,
    newsletter: false
  });

  const [activeTab, setActiveTab] = useState('Profile Details');
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleToggle = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };
  const handleSaveChanges = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Success!',
      text: 'Your profile changes have been saved successfully.',
      icon: 'success',
      confirmButtonColor: '#0f766e',
      background: '#ffffff',
      customClass: { popup: 'rounded-2xl ' }
    });
  };

  const handleActionTrigger = (title, message) => {
    Swal.fire({
      title: title,
      text: message,
      icon: 'info',
      confirmButtonColor: '#0f766e',
      background: '#ffffff',
      customClass: { popup: 'rounded-2xl ' }
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800  p-6 pt-20">
      
      <div className="text-xs text-slate-400 mb-3 flex items-center gap-1.5 tracking-wide">
        <span>Dashboard</span>
        <span className="text-slate-300 font-normal">&gt;</span>
        <span className="text-slate-600 font-medium">Profile Settings</span>
      </div>

      <div className="max-w-10xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">My Profile</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage your personal information, account settings, and preferences.</p>
        </div>

        <div className="border-b border-slate-200/80 flex gap-6">
          {['Profile Details', 'Security', 'Preferences', 'Activity Log'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-semibold border-b-2 transition-all relative ${
                activeTab === tab 
                  ? 'border-teal-600 text-teal-700 font-bold' 
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <h2 className="text-sm font-bold text-slate-900 mb-6">Personal Information</h2>
              
              <form onSubmit={handleSaveChanges} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="flex flex-col items-center justify-start pt-2 text-center ">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-teal-600 text-white font-bold text-2xl flex items-center justify-center tracking-wider shadow-sm">
                      AS
                    </div>
                    <button 
                      type="button"
                      onClick={() => handleActionTrigger('Upload Photo', 'Photo uploader UI would open here.')}
                      className="absolute bottom-0 right-0 p-1.5 bg-white border border-slate-200 text-slate-600 hover:text-teal-700 rounded-full shadow-sm transition-colors"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-4">{formData.fullName}</h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">{formData.designation} (Pro Plan)</p>
                  <span className="mt-3 inline-block bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-100">
                    Verified Account
                  </span>
                </div>

                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Full Name</label>
                    <input 
                      type="text" name="fullName" value={formData.fullName} onChange={handleInputChange}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-xs font-medium focus:outline-none focus:border-teal-500 transition-all text-slate-800" 
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Email Address</label>
                    <input 
                      type="email" name="email" value={formData.email} onChange={handleInputChange}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-xs font-medium focus:outline-none focus:border-teal-500 transition-all text-slate-800" 
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Phone Number</label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3 flex items-center gap-1 text-xs font-medium text-slate-500 border-r border-slate-200 pr-2">
                        <span className="w-4 h-3 bg-orange-500 block relative overflow-hidden rounded-sm"><span className="absolute inset-0 bg-white h-1/3 top-1/3"></span><span className="absolute inset-0 bg-green-600 h-1/3 top-2/3"></span></span>
                        <ChevronDown className="w-3 h-3" />
                      </div>
                      <input 
                        type="text" name="phone" value={formData.phone} onChange={handleInputChange}
                        className="w-full border border-slate-200 rounded-lg p-2.5 pl-16 text-xs font-medium focus:outline-none focus:border-teal-500 transition-all text-slate-800" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Designation</label>
                    <input 
                      type="text" name="designation" value={formData.designation} onChange={handleInputChange}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-xs font-medium focus:outline-none focus:border-teal-500 transition-all text-slate-800" 
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Company Name</label>
                    <input 
                      type="text" name="companyName" value={formData.companyName} onChange={handleInputChange}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-xs font-medium focus:outline-none focus:border-teal-500 transition-all text-slate-800" 
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">GSTIN</label>
                    <input 
                      type="text" name="gstin" value={formData.gstin} onChange={handleInputChange}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-xs font-medium focus:outline-none focus:border-teal-500 transition-all text-slate-800 uppercase" 
                    />
                  </div>

                  <div className="space-y-1.5 relative">
                    <label className="text-xs font-semibold text-slate-700">Country</label>
                    <select name="country" value={formData.country} onChange={handleInputChange} className="w-full border border-slate-200 rounded-lg p-2.5 text-xs font-medium appearance-none focus:outline-none focus:border-teal-500 bg-white text-slate-800 cursor-pointer">
                      <option>India</option>
                      <option>United Arab Emirates</option>
                      <option>United States</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-[34px] pointer-events-none" />
                  </div>

                  <div className="space-y-1.5 relative">
                    <label className="text-xs font-semibold text-slate-700">City</label>
                    <select name="city" value={formData.city} onChange={handleInputChange} className="w-full border border-slate-200 rounded-lg p-2.5 text-xs font-medium appearance-none focus:outline-none focus:border-teal-500 bg-white text-slate-800 cursor-pointer">
                      <option>Mumbai</option>
                      <option>Delhi</option>
                      <option>Bangalore</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-[34px] pointer-events-none" />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Office Address</label>
                    <input 
                      type="text" name="officeAddress" value={formData.officeAddress} onChange={handleInputChange}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-xs font-medium focus:outline-none focus:border-teal-500 transition-all text-slate-800" 
                    />
                  </div>

                </div>

                <div className="md:col-span-3 flex justify-end gap-3 pt-2 border-t border-slate-50 mt-2">
                  <button 
                    type="button"
                    onClick={() => handleActionTrigger('Cancelled', 'Changes were reverted.')} 
                    className="px-5 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition-colors"
                  >
                    Save Changes
                  </button>
                </div>

              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Security</h2>
                  <p className="text-[11px] text-slate-400 mt-0.5">Keep your account secure with strong authentication.</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded-lg border border-slate-50 hover:bg-slate-50/50 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Lock className="w-4 h-4" /></div>
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">Password</span>
                        <span className="text-xs text-slate-400 tracking-widest block mt-0.5">••••••••</span>
                      </div>
                    </div>
                    <button onClick={() => handleActionTrigger('Change Password', 'Password reset flow initiated.')} className="px-3 py-1.5 border border-slate-200 hover:border-slate-300 text-slate-600 text-[11px] font-bold rounded-lg transition-colors bg-white">Change</button>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg border border-slate-50 hover:bg-slate-50/50 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Shield className="w-4 h-4" /></div>
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">Two-Factor Authentication</span>
                        <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">Enabled</span>
                      </div>
                    </div>
                    <button onClick={() => handleActionTrigger('Manage 2FA', 'Opening MFA device configurations.')} className="px-3 py-1.5 border border-slate-200 hover:border-slate-300 text-slate-600 text-[11px] font-bold rounded-lg transition-colors bg-white">Manage</button>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg border border-slate-50 hover:bg-slate-50/50 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Smartphone className="w-4 h-4" /></div>
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">Login Sessions</span>
                        <span className="text-[11px] text-slate-400 font-medium block mt-0.5">3 active sessions</span>
                      </div>
                    </div>
                    <button onClick={() => handleActionTrigger('Active Sessions', 'Listing current browser fingerprints.')} className="px-3 py-1.5 border border-slate-200 hover:border-slate-300 text-slate-600 text-[11px] font-bold rounded-lg transition-colors bg-white">View</button>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg border border-slate-50 hover:bg-slate-50/50 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-50 text-orange-500 rounded-lg"><KeyRound className="w-4 h-4" /></div>
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">Account Recovery</span>
                        <span className="text-[11px] text-slate-400 font-medium block mt-0.5">Set recovery options</span>
                      </div>
                    </div>
                    <button onClick={() => handleActionTrigger('Recovery Options', 'Opening fallback options modal.')} className="px-3 py-1.5 border border-slate-200 hover:border-slate-300 text-slate-600 text-[11px] font-bold rounded-lg transition-colors bg-white">Manage</button>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Preferences</h2>
                    <p className="text-[11px] text-slate-400 mt-0.5">Manage how you receive alerts and updates.</p>
                  </div>

                  <div className="space-y-3.5">
                    {[
                      { id: 'emailNotif', label: 'Email Notifications', icon: Mail, iconColor: 'text-blue-600 bg-blue-50' },
                      { id: 'smsNotif', label: 'SMS Notifications', icon: MessageSquare, iconColor: 'text-indigo-600 bg-indigo-50' },
                      { id: 'inAppNotif', label: 'In-App Notifications', icon: Bell, iconColor: 'text-teal-600 bg-teal-50' },
                      { id: 'newsletter', label: 'Newsletter', icon: FileText, iconColor: 'text-orange-500 bg-orange-50' }
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${item.iconColor}`}><Icon className="w-4 h-4" /></div>
                            <span className="text-xs font-bold text-slate-800">{item.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold uppercase ${preferences[item.id] ? 'text-teal-600' : 'text-slate-300'}`}>
                              {preferences[item.id] ? 'Enabled' : 'Disabled'}
                            </span>
                            <button 
                              type="button"
                              onClick={() => handleToggle(item.id)}
                              className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-all duration-200 focus:outline-none ${
                                preferences[item.id] ? 'bg-teal-600 justify-end' : 'bg-slate-200 justify-start'
                              }`}
                            >
                              <span className="w-4 h-4 rounded-full bg-white shadow-sm"></span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button 
                  onClick={() => handleActionTrigger('All Preferences', 'Opening multi-channel alert matrix.')}
                  className="w-full text-center text-xs font-bold text-slate-500 hover:text-slate-700 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-400" /> Manage All Preferences
                </button>
              </div>

            </div>

          </div>

          <div className="space-y-6">
            
            <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900">Account Summary</h2>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-100">Pro Plan</span>
              </div>

              <div className="space-y-3 text-xs font-medium text-slate-500">
                <div className="flex justify-between items-center py-1">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400" /> Member Since</div>
                  <span className="font-bold text-slate-800">12 Jan 2024</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <div className="flex items-center gap-2"><UserCheck className="w-4 h-4 text-slate-400" /> Account Type</div>
                  <span className="font-bold text-slate-800">Exporter</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <div className="flex items-center gap-2"><Gem className="w-4 h-4 text-slate-400" /> Plan</div>
                  <span className="font-bold text-slate-800">Pro Plan</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400" /> Plan Valid Till</div>
                  <span className="font-bold text-slate-800">25 Apr 2026</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Account Status</div>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span> Active
                  </span>
                </div>
              </div>

              <button 
                onClick={() => handleActionTrigger('Subscription', 'Redirecting to your active stripe gateway portal...')}
                className="w-full text-center text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <FileText className="w-4 h-4 text-slate-400" /> View Subscription →
              </button>
            </div>

            <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Profile Completion</h2>
                <p className="text-[11px] text-slate-400 mt-0.5">Complete your profile to unlock all features.</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-600 h-full w-[85%] rounded-full"></div>
                </div>
                <span className="text-xs font-bold text-slate-700">85%</span>
              </div>

              <div className="space-y-2.5 pt-2 text-xs font-medium text-slate-500">
                {[
                  { label: 'Personal Information', completed: true },
                  { label: 'Company Information', completed: true },
                  { label: 'GSTIN Verified', completed: true },
                  { label: 'Contact Number Verified', completed: true },
                  { label: 'Business Address', completed: true },
                  { label: 'Bank Details', completed: false }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={item.completed ? 'text-teal-600' : 'text-slate-300'}>✓</span>
                      <span className={item.completed ? 'text-slate-600 font-medium' : 'text-slate-400'}>{item.label}</span>
                    </div>
                    {item.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-50" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-300" />
                    )}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleActionTrigger('Profile Steps', 'Opening bank details verification form...')}
                className="w-full text-center text-xs font-bold text-teal-700 bg-white border border-teal-200/80 hover:bg-teal-50/50 py-2.5 rounded-lg transition-colors"
              >
                Update Missing Information
              </button>
            </div>

            <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900">Recent Account Activity</h2>
                <button onClick={() => handleActionTrigger('All Logs', 'Loading full account audit logs.')} className="text-xs font-bold text-teal-700 hover:text-teal-800">View All</button>
              </div>

              <div className="space-y-4">
                {[
                  { text: 'Password changed successfully', time: '22 Apr 2025, 10:30 AM', icon: Lock, bg: 'bg-blue-50 text-blue-600' },
                  { text: 'Email address updated', time: '18 Apr 2025, 04:15 PM', icon: Mail, bg: 'bg-indigo-50 text-indigo-600' },
                  { text: 'Two-factor authentication enabled', time: '15 Apr 2025, 11:20 AM', icon: Shield, bg: 'bg-emerald-50 text-emerald-600' },
                  { text: 'Profile information updated', time: '10 Apr 2025, 09:45 AM', icon: UserCheck, bg: 'bg-orange-50 text-orange-500' }
                ].map((log, idx) => {
                  const LogIcon = log.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3 text-xs">
                      <div className={`p-2 rounded-lg shrink-0 ${log.bg}`}><LogIcon className="w-4 h-4" /></div>
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-800 block leading-tight">{log.text}</span>
                        <span className="text-[10px] text-slate-400 font-normal block">{log.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}