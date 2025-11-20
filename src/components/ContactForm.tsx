import { MapPin, Mail, Send } from "lucide-react";
import { Card } from "./ui/card";
import { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    email: "",
    issue: "",
    description: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="relative py-24 px-6">
      {/* Background glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full blur-3xl" style={{
        backgroundColor: 'rgba(225, 176, 81, 0.1)'
      }} />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            Nous contacter
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Une question ? Un problème ? N'hésitez pas à nous contacter.<br />
            Nous vous répondrons dans les plus brefs délais.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Map Section */}
          <Card className="relative border-gray-900 p-8 overflow-hidden group transition-all duration-300" style={{
            background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 1))'
          }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(225, 176, 81, 0.3)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgb(17, 24, 39)'}>
            <div className="mb-6">
              <h3 className="text-2xl text-white mb-2">Localisation</h3>
              <p className="text-gray-400 text-sm">
                Retrouvez-nous lors de l'événement
              </p>
            </div>

            {/* Map Placeholder */}
            <div className="relative aspect-square rounded-xl overflow-hidden border border-gray-700/50 flex items-center justify-center group-hover:border-[#E1B051]/20 transition-all duration-300 h-96" style={{
              background: 'linear-gradient(to bottom right, rgba(31, 41, 55, 0.5), rgba(17, 24, 39, 1))'
            }}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4" style={{
                  backgroundColor: 'rgba(225, 176, 81, 0.1)',
                  border: '1px solid rgba(225, 176, 81, 0.3)'
                }}>
                  <MapPin className="w-10 h-10" style={{ color: 'rgba(225, 176, 81, 1)' }} />
                </div>
                <p className="text-gray-400 text-sm">
                  Carte de localisation<br />
                  à venir
                </p>
              </div>
              
              {/* Grid overlay for tech aesthetic */}
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full" style={{
                  backgroundImage: `
                    linear-gradient(rgba(193, 143, 40, 0.9) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(225, 176, 81, 0.9) 1px, transparent 1px)
                  `,
                  backgroundSize: '45px 45px'
                }} />
              </div>
            </div>

            {/* Location details */}
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'rgba(225, 176, 81, 1)' }} />
                <div>
                  <p className="text-white text-sm">Etherbay Event Center</p>
                  <p className="text-gray-400 text-sm">Adresse exacte à confirmer</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Contact Form */}
          <Card className="relative border-gray-900 p-8" style={{
            background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 1))'
          }}>
            <div className="mb-6">
              <h3 className="text-2xl text-white mb-2">Formulaire de contact</h3>
              <p className="text-gray-400 text-sm">
                Remplissez le formulaire ci-dessous
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm text-gray-300 mb-2">
                  Email <span style={{ color: 'rgba(225, 176, 81, 1)' }}>*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="votre@email.com"
                    className="w-full bg-black/50 border border-gray-700 rounded-lg pl-11 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none transition-all h-10 px-4"
                    style={{
                      transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(225, 176, 81, 0.5)';
                      e.target.style.boxShadow = '0 0 0 1px rgba(225, 176, 81, 0.5)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgb(55, 65, 81)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Issue Field */}
              <div>
                <label htmlFor="issue" className="block text-sm text-gray-300 mb-2">
                  Sujet <span style={{ color: 'rgba(225, 176, 81, 1)' }}>*</span>
                </label>
                <select
                  id="issue"
                  name="issue"
                  value={formData.issue}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none transition-all appearance-none cursor-pointer h-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(225, 176, 81, 1)' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    transition: 'border-color 0.2s, box-shadow 0.2s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(225, 176, 81, 0.5)';
                    e.target.style.boxShadow = '0 0 0 1px rgba(225, 176, 81, 0.5)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgb(55, 65, 81)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="question">Question générale</option>
                  <option value="lottery">À propos de la loterie</option>
                  <option value="crypto">Aide avec la crypto</option>
                  <option value="event">À propos de l'événement</option>
                  <option value="technical">Problème technique</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              {/* Description Field */}
              <div>
                <label htmlFor="description" className="block text-sm text-gray-300 mb-2">
                  Description <span style={{ color: 'rgba(225, 176, 81, 1)' }}>*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Décrivez votre demande en détail..."
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none transition-all resize-none"
                  style={{
                    transition: 'border-color 0.2s, box-shadow 0.2s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(225, 176, 81, 0.5)';
                    e.target.style.boxShadow = '0 0 0 1px rgba(225, 176, 81, 0.5)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgb(55, 65, 81)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full text-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center h-10 gap-2 group shadow-lg"
                style={{
                  backgroundColor: 'rgba(110, 14, 26, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(138, 28, 38, 1)';
                  e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(138, 28, 38, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(110, 14, 26, 1)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                }}
              >
                <span>Envoyer le message</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}