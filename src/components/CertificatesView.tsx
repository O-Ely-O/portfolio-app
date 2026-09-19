import React from 'react';
import { CERTIFICATES_DATA } from '../data/portfolioData';
import { Award, ExternalLink, ShieldCheck, CheckCircle } from 'lucide-react';

export const CertificatesView: React.FC = () => {
  return (
    <div id="certificates-view-container" className="space-y-4">
      <div className="pb-2 border-b border-blue-100/60">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Award className="w-4 h-4 text-sky-500" />
          Industry Certifications & Professional Accreditations
        </h2>
        <p className="text-xs text-slate-500">
          Verified credentials in cloud computing, modern data architecture, artificial intelligence, and machine learning.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CERTIFICATES_DATA.map((cert) => (
          <div
            key={cert.id}
            id={`cert-card-${cert.id}`}
            className="glass-subcard rounded-2xl p-4 border border-white/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/90 p-1.5 shadow-sm border border-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
                  <img
                    src={cert.badgeUrl}
                    alt={cert.title}
                    className="w-full h-full object-contain drop-shadow-xs"
                    loading="lazy"
                  />
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50/90 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {cert.issuer}
                  </span>
                  <div className="text-[10px] text-slate-500 font-medium mt-1">
                    {cert.code}
                  </div>
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                {cert.title}
              </h3>

              <div className="inline-block text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded mt-1 mb-2 border border-sky-100">
                Official Credential: {cert.code}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {cert.description}
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Verified Credential</span>
              </div>

              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 group-hover:translate-x-0.5 transition-all"
              >
                <span>Verify</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
