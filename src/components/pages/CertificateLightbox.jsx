import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

export default function CertificateLightbox({ certificate, isOpen, onClose }) {
  if (!isOpen || !certificate) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 20 }}
          className="bg-gray-900/95 backdrop-blur-lg rounded-2xl border border-white/20 max-w-2xl w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>

          {/* Certificate Image */}
          <div className="relative h-96 md:h-[500px] overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900">
            <img
              src={certificate.img}
              alt={certificate.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/800x600?text=Certificate";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 space-y-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {certificate.title}
              </h2>
              <p className="text-lg text-gray-300">{certificate.issuer}</p>
            </div>

            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
              {certificate.date}
            </div>

            {certificate.credentialId && (
              <div className="text-sm text-gray-400">
                <span className="text-gray-500">Credential ID:</span> {certificate.credentialId}
              </div>
            )}

            {certificate.description && (
              <p className="text-gray-300 leading-relaxed">{certificate.description}</p>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-white/10">
              {certificate.link && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={certificate.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 rounded-lg hover:from-blue-500/30 hover:to-purple-500/30 transition-all font-semibold"
                >
                  <ExternalLink className="w-5 h-5" />
                  View Certificate
                </motion.a>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-semibold"
              >
                Close
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
