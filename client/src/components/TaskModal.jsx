import { useEffect, useState } from 'react';

const emptyForm = {
  title: '',
  description: '',
  stage: 'todo',
  priority: 'medium'
};

export default function TaskModal({ isOpen, onClose, onSubmit, initialTask, loading }) {
  const [form, setForm] = useState(emptyForm);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialTask) {
      setForm({
        title: initialTask.title || '',
        description: initialTask.description || '',
        stage: initialTask.stage || 'todo',
        priority: initialTask.priority || 'medium'
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialTask, isOpen]);

  if (!isOpen && !show) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(form);
  };

  const title = initialTask ? 'Edit Task' : 'Create Task';

  const getStageStyles = (stage) => {
    switch(stage) {
      case 'inprogress':
        return { borderLeft: '2px solid #f59e0b', background: 'linear-gradient(90deg, rgba(245,158,11,0.06) 0%, #0d0d10 40%)' };
      case 'done':
        return { borderLeft: '2px solid #22c55e', background: 'linear-gradient(90deg, rgba(34,197,94,0.06) 0%, #0d0d10 40%)' };
      default:
        return { borderLeft: '2px solid #3b82f6', background: 'linear-gradient(90deg, rgba(59,130,246,0.06) 0%, #0d0d10 40%)' };
    }
  };

  const getPriorityStyles = (priority) => {
    switch(priority) {
      case 'high':
        return { borderLeft: '2px solid #ef4444', background: 'linear-gradient(90deg, rgba(239,68,68,0.06) 0%, #0d0d10 40%)' };
      case 'medium':
        return { borderLeft: '2px solid #f59e0b', background: 'linear-gradient(90deg, rgba(245,158,11,0.06) 0%, #0d0d10 40%)' };
      default:
        return { borderLeft: '2px solid #22c55e', background: 'linear-gradient(90deg, rgba(34,197,94,0.06) 0%, #0d0d10 40%)' };
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200"
      style={{
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        opacity: show ? 1 : 0
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="transition-transform duration-250 ease-out"
        style={{
          background: 'linear-gradient(145deg, #131316 0%, #0f0f12 100%)',
          border: '1px solid #2e2e33',
          borderRadius: '20px',
          boxShadow: '0 0 0 1px rgba(124, 58, 237, 0.08), 0 32px 64px rgba(0, 0, 0, 0.6), 0 0 80px rgba(124, 58, 237, 0.04)',
          padding: '28px',
          maxWidth: '480px',
          width: 'calc(100% - 32px)',
          transform: show ? 'translateY(0)' : 'translateY(16px)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 650, color: '#fafafa', letterSpacing: '-0.3px', margin: 0 }}>
              {title}
            </h2>
            <p style={{ fontSize: '12px', color: '#52525b', marginTop: '2px', marginBottom: 0 }}>
              Fill in the details below
            </p>
          </div>
          
          <button
            type="button"
            onClick={onClose}
            style={{
              width: '28px',
              height: '28px',
              background: '#1c1c1f',
              border: '1px solid #27272a',
              borderRadius: '8px',
              color: '#71717a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 150ms ease',
              cursor: 'pointer',
              padding: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#27272a';
              e.currentTarget.style.color = '#fafafa';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#1c1c1f';
              e.currentTarget.style.color = '#71717a';
            }}
            aria-label="Close modal"
          >
            <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(124,58,237,0.13), #27272a, transparent)', margin: '20px 0' }} />

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label htmlFor="title" style={{ display: 'block', fontSize: '10px', fontWeight: 600, color: '#52525b', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
              Title
            </label>
            <input
              id="title"
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              placeholder="Build a dashboard"
              style={{
                background: '#0d0d10',
                border: '1px solid #27272a',
                borderRadius: '12px',
                padding: '12px 16px',
                fontSize: '14px',
                color: '#fafafa',
                width: '100%',
                transition: 'border-color 200ms, box-shadow 200ms',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#7c3aed';
                e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.12), inset 0 1px 0 rgba(255,255,255,0.02)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#27272a';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div>
            <label htmlFor="description" style={{ display: 'block', fontSize: '10px', fontWeight: 600, color: '#52525b', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Add a few details..."
              style={{
                background: '#0d0d10',
                border: '1px solid #27272a',
                borderRadius: '12px',
                padding: '12px 16px',
                fontSize: '14px',
                color: '#fafafa',
                width: '100%',
                minHeight: '96px',
                resize: 'none',
                lineHeight: '1.6',
                transition: 'border-color 200ms, box-shadow 200ms',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#7c3aed';
                e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.12), inset 0 1px 0 rgba(255,255,255,0.02)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#27272a';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label htmlFor="stage" style={{ display: 'block', fontSize: '10px', fontWeight: 600, color: '#52525b', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
                Stage
              </label>
              <div style={{ position: 'relative' }}>
                <select
                  id="stage"
                  name="stage"
                  value={form.stage}
                  onChange={handleChange}
                  style={{
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    border: '1px solid #27272a',
                    borderRadius: '12px',
                    padding: '11px 40px 11px 14px',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#fafafa',
                    width: '100%',
                    cursor: 'pointer',
                    transition: 'border-color 200ms, box-shadow 200ms',
                    outline: 'none',
                    ...getStageStyles(form.stage)
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#7c3aed';
                    e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.12)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#27272a';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="todo" style={{ background: '#0d0d10' }}>&#x2022; Todo</option>
                  <option value="inprogress" style={{ background: '#0d0d10' }}>&#x2022; In Progress</option>
                  <option value="done" style={{ background: '#0d0d10' }}>&#x2022; Done</option>
                </select>
                <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#52525b', width: '14px', height: '14px' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="priority" style={{ display: 'block', fontSize: '10px', fontWeight: 600, color: '#52525b', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
                Priority
              </label>
              <div style={{ position: 'relative' }}>
                <select
                  id="priority"
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  style={{
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    border: '1px solid #27272a',
                    borderRadius: '12px',
                    padding: '11px 40px 11px 14px',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#fafafa',
                    width: '100%',
                    cursor: 'pointer',
                    transition: 'border-color 200ms, box-shadow 200ms',
                    outline: 'none',
                    ...getPriorityStyles(form.priority)
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#7c3aed';
                    e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.12)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#27272a';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="low" style={{ background: '#0d0d10' }}>&#x2022; Low</option>
                  <option value="medium" style={{ background: '#0d0d10' }}>&#x2022; Medium</option>
                  <option value="high" style={{ background: '#0d0d10' }}>&#x2022; High</option>
                </select>
                <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#52525b', width: '14px', height: '14px' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'transparent',
                border: '1px solid #27272a',
                borderRadius: '12px',
                padding: '10px 20px',
                fontSize: '13px',
                fontWeight: 500,
                color: '#71717a',
                cursor: 'pointer',
                transition: 'all 150ms'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#3f3f46';
                e.currentTarget.style.color = '#fafafa';
                e.currentTarget.style.background = '#1c1c1f';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#27272a';
                e.currentTarget.style.color = '#71717a';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                border: 'none',
                borderRadius: '12px',
                padding: '10px 24px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#fff',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 16px rgba(124, 58, 237, 0.3)',
                transition: 'all 150ms',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '110px'
              }}
              onMouseEnter={(e) => {
                if(loading) return;
                e.currentTarget.style.background = 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(124, 58, 237, 0.4)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                if(loading) return;
                e.currentTarget.style.background = 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(124, 58, 237, 0.3)';
                e.currentTarget.style.transform = 'none';
              }}
              onMouseDown={(e) => {
                if(loading) return;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(124, 58, 237, 0.3)';
              }}
              onMouseUp={(e) => {
                if(loading) return;
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(124, 58, 237, 0.4)';
              }}
            >
              {loading ? (
                <style>
                  {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
                </style>
              ) : null}
              {loading ? (
                <div style={{
                  width: '14px',
                  height: '14px',
                  border: '2px solid rgba(255,255,255,0.2)',
                  borderTopColor: '#fff',
                  borderRadius: '50%',
                  animation: 'spin 0.6s linear infinite'
                }} />
              ) : (
                initialTask ? 'Update Task' : 'Create Task'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
